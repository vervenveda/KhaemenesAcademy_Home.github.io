"use strict";
// Standalone backup utility tests: test only synthetic file content; never access real learner records.
// Run: node --test tests/record-backup.test.cjs
const test=require("node:test"), assert=require("node:assert/strict");
const fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
const {webcrypto}=require("node:crypto");
const html=fs.readFileSync(path.join(__dirname,"../tools/record-backup/index.html"),"utf8");
const script=html.match(/<script>([\s\S]*?)<\/script>/)?.[1];
assert.ok(script,"Standalone inline script must exist");
function harness(){
 const elements=new Map(),downloads=[],opened=[];
 function element(id){
   if(!elements.has(id))elements.set(id,{
     value:"",files:[],disabled:false,textContent:"",children:[],classList:{toggle(){}},
     handlers:{},addEventListener(event,fn){this.handlers[event]=fn},
     replaceChildren(){this.children=[]},
     append(x){this.children.push(x)},
     remove(){},click(){if(this.href)downloads.push({href:this.href,name:this.download})}
   });
   return elements.get(id);
 }
 const document={
   getElementById:element,
   createElement(){return element("dynamic-"+(++document.count))},
   body:{append(){}},count:0
 };
 const URLMock={createObjectURL(blob){const ref="blob:synthetic-"+opened.length;opened.push({ref,blob});return ref},
   revokeObjectURL(){}};
 const context={document,URL:URLMock,Blob,crypto:webcrypto,TextEncoder,TextDecoder,
   btoa,atob,setTimeout(){},Date,Array,Uint8Array,JSON,Error};
 vm.runInNewContext(script,context,{timeout:2000});
 return {element,downloads,opened};
}
function syntheticFile(name,bytes){
 const buffer=Buffer.from(bytes);
 return {name,size:buffer.length,async arrayBuffer(){return Uint8Array.from(buffer).buffer}};
}
test("encrypt, authenticate, and recover byte-identical synthetic inputs",async()=>{
 const h=harness();
 const f=syntheticFile("course-work.txt","Test learner's hypothetical work\nline 2 \u2605");
 h.element("originalFiles").files=[f];
 h.element("sealPassword").value=h.element("sealConfirm").value="Example-only Recovery 2026!!";
 await h.element("encrypt").handlers.click();
 assert.equal(h.downloads.length,1);
 assert.ok(h.downloads[0].name.endsWith(".encrypted.json"));
 assert.ok(!h.element("encryptStatus").textContent.startsWith("Backup not created:"));
 const blob=h.opened.find(x=>x.ref===h.downloads[0].href).blob;
 const envelope=JSON.parse(await blob.text());
 assert.equal(envelope.algorithm,"AES-256-GCM");
 assert.equal(envelope.kdf,"PBKDF2-SHA-256");
 assert.equal(envelope.schema,"khaemenes-local-encrypted-backup-v1");
 assert.ok(!JSON.stringify(envelope).includes("hypothetical work"));
 h.element("sealedFile").files=[{size:blob.size,text:()=>blob.text()}];
 h.element("openPassword").value="Example-only Recovery 2026!!";
 await h.element("decrypt").handlers.click();
 assert.equal(h.element("recovered").children.length,1);
 assert.ok(h.element("decryptStatus").textContent.startsWith("Verified 1 original files"));
 h.element("recovered").children[0].handlers.click();
 assert.equal(h.downloads.length,2);
 const restored=h.opened.find(x=>x.ref===h.downloads[1].href).blob;
 assert.equal(await restored.text(),"Test learner's hypothetical work\nline 2 \u2605");
});
test("wrong password cannot decrypt; no recovered file is offered",async()=>{
 const h=harness();
 h.element("originalFiles").files=[syntheticFile("test.txt","synthetic")];
 h.element("sealPassword").value=h.element("sealConfirm").value="Example-only Recovery 2026!!";
 await h.element("encrypt").handlers.click();
 const blob=h.opened.find(x=>x.ref===h.downloads[0].href).blob;
 h.element("sealedFile").files=[{size:blob.size,text:()=>blob.text()}];
 h.element("openPassword").value="Definitely Wrong Password";
 await h.element("decrypt").handlers.click();
 assert.equal(h.element("recovered").children.length,0);
 assert.ok(h.element("decryptStatus").textContent.startsWith("Verification failed:"));
});
test("page has no network, third-party scripts, or localStorage access",()=>{
 assert.ok(html.includes("connect-src 'none'"));
 assert.ok(!/<script[^>]*src=/i.test(html));
 assert.ok(!/\b(fetch|XMLHttpRequest|WebSocket|sendBeacon|localStorage|sessionStorage)\b/.test(script));
 assert.ok(!/type="file"[^>]*webkitdirectory/.test(html));
});
test("missing input and mismatched password do not produce an archive",async()=>{
 const h=harness();
 h.element("sealPassword").value="Example-only Recovery 2026!!";
 h.element("sealConfirm").value="Different Password Here";
 await h.element("encrypt").handlers.click();
 assert.equal(h.downloads.length,0);
 assert.ok(h.element("encryptStatus").textContent.includes("Passphrases do not match"));
});

test("same-named exports remain independently recoverable",async()=>{
 const h=harness();
 h.element("originalFiles").files=[syntheticFile("lesson.json","Course A work"),syntheticFile("lesson.json","Course B work")];
 h.element("sealPassword").value=h.element("sealConfirm").value="Example-only Recovery 2026!!";
 await h.element("encrypt").handlers.click();
 assert.equal(h.downloads.length,1);
 const blob=h.opened.find(x=>x.ref===h.downloads[0].href).blob;
 h.element("sealedFile").files=[{size:blob.size,text:()=>blob.text()}];
 h.element("openPassword").value="Example-only Recovery 2026!!";
 await h.element("decrypt").handlers.click();
 const buttons=h.element("recovered").children;
 assert.equal(buttons.length,2);
 assert.notEqual(buttons[0].textContent,buttons[1].textContent);
 buttons.forEach(button=>button.handlers.click());
 const restored=await Promise.all(h.downloads.slice(1).map(async item=>({
   name:item.name,contents:await h.opened.find(x=>x.ref===item.href).blob.text()
 })));
 assert.deepEqual(restored.map(x=>x.contents),["Course A work","Course B work"]);
 assert.notEqual(restored[0].name,restored[1].name);
});
test("mismatched actual file bytes fail before backup creation",async()=>{
 const h=harness();
 const changed={name:"broken.txt",size:1,async arrayBuffer(){return new Uint8Array(12).buffer}};
 h.element("originalFiles").files=[changed];
 h.element("sealPassword").value=h.element("sealConfirm").value="Example-only Recovery 2026!!";
 await h.element("encrypt").handlers.click();
 assert.equal(h.downloads.length,0);
 assert.ok(h.element("encryptStatus").textContent.includes("changed or exceeded"));
});
test("backup status never claims complete academic coverage or cloud recovery",async()=>{
 const h=harness();
 h.element("originalFiles").files=[syntheticFile("partial-export.json","some evidence")];
 h.element("sealPassword").value=h.element("sealConfirm").value="Example-only Recovery 2026!!";
 await h.element("encrypt").handlers.click();
 assert.ok(h.element("encryptStatus").textContent.includes("does NOT prove all course work was exported"));
 assert.ok(h.element("encryptStatus").textContent.includes("Reopen the saved archive"));
});
