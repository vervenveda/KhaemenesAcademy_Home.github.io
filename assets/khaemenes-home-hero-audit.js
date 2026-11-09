/* Khaemenes Academy Home · Opt-in hero/chrome forensic probe v1.0
 * Activate with ?hero_audit=1. Never reads storage, cookies, learner records,
 * text content, API credentials, network requests, or sends diagnostics away.
 */
(()=>{"use strict";
if(new URLSearchParams(location.search).get("hero_audit")!=="1"||window.KhaemenesHomeHeroAudit)return;
const MAX=120,logs=[],ids=["vnv333NetworkTicker","vnvTickerAutoPopulate","vnvHeaderAutoPopulate","vnvEnrichedMenuOverlay"];
const started=performance.now();let panel=null,body=null,raf=0,observer=null;
function rectOf(node){if(!node)return null;const r=node.getBoundingClientRect();return [r.x,r.y,r.width,r.height].map(v=>Math.round(v));}
function metrics(){
 const hero=document.querySelector("main .hero"),h1=hero?.querySelector("h1");
 const heroStyle=hero?getComputedStyle(hero):null;
 return {
   hero:rectOf(hero),title:rectOf(h1),
   heroDisplay:heroStyle?.display||"missing",heroVisibility:heroStyle?.visibility||"missing",heroOpacity:heroStyle?.opacity||"missing",
   heroAnimation:heroStyle?.animationName||"missing",
   headerNodes:ids.map(id=>({id,count:document.querySelectorAll("#"+id).length,rect:rectOf(document.getElementById(id))})),
   viewport:[innerWidth,innerHeight],scrollY:Math.round(scrollY)
 };
}
function record(type,info=""){
 const prev=logs.at(-1);
 const item={ms:Math.round(performance.now()-started),type,info:String(info).slice(0,180),metrics:metrics()};
 if(prev&&prev.type===type&&prev.info===item.info&&JSON.stringify(prev.metrics)===JSON.stringify(item.metrics))return;
 logs.push(item);if(logs.length>MAX)logs.shift();paint();
}
function paint(){
 if(!body)return;
 const latest=logs.at(-1);
 body.textContent=JSON.stringify({latest,eventCount:logs.length,recent:logs.slice(-14).map(({ms,type,info,metrics})=>({ms,type,info,hero:metrics.hero,title:metrics.title,headerNodes:metrics.headerNodes.map(x=>[x.id,x.count,x.rect])}))},null,2);
}
function open(){
 if(panel)return;
 panel=document.createElement("aside");panel.id="khaeHomeHeroAuditPanel";
 panel.style.cssText="position:fixed;z-index:2147483647;left:8px;bottom:8px;width:min(720px,calc(100vw - 16px));max-height:52vh;overflow:auto;padding:14px;border:2px solid #b48b45;border-radius:7px;background:#202724;color:#fff8e9;font:400 16px/1.5 ui-monospace,monospace;box-shadow:0 8px 30px #0008";
 const head=document.createElement("div");head.style.cssText="display:flex;justify-content:space-between;align-items:center;gap:12px";
 const title=document.createElement("strong");title.textContent="Academy Home · Hero Layers";title.style.fontSize="18px";
 const close=document.createElement("button");close.textContent="Close";close.type="button";close.style.cssText="padding:8px 12px;border:1px solid #b48b45;border-radius:7px;background:#fff8e9;color:#202724;font-size:16px";
 close.addEventListener("click",()=>{panel.remove();panel=null;body=null});
 head.append(title,close);body=document.createElement("pre");body.style.cssText="white-space:pre-wrap;overflow-wrap:anywhere;font:inherit;margin:12px 0 0";
 panel.append(head,body);document.body.append(panel);paint();
}
function start(){
 open();record("probe-start");
 let last=metrics();let count=0;
 function frame(){
  const now=metrics();
  if(JSON.stringify(now)!==JSON.stringify(last)){
    // Ignore scrolling and viewport changes in comparison only for geometry shift classification.
    if(JSON.stringify({hero:now.hero,title:now.title,heroDisplay:now.heroDisplay,heroVisibility:now.heroVisibility,heroOpacity:now.heroOpacity,headerNodes:now.headerNodes})!==
       JSON.stringify({hero:last.hero,title:last.title,heroDisplay:last.heroDisplay,heroVisibility:last.heroVisibility,heroOpacity:last.heroOpacity,headerNodes:last.headerNodes}))
      record("geometry-or-style-change");
    last=now;
  }
  if(++count<600)raf=requestAnimationFrame(frame);
 }
 raf=requestAnimationFrame(frame);
 observer=new MutationObserver(changes=>{
  const touched=[];
  for(const change of changes){
   for(const n of [...change.addedNodes,...change.removedNodes]){
     if(n.nodeType!==1)continue;
     const id=n.id||"";
     if(ids.includes(id)||n.matches?.("main .hero")||ids.some(target=>n.querySelector?.("#"+target)))
       touched.push((change.addedNodes.length?"added:":"removed:")+(id||n.tagName));
   }
   if(change.type==="attributes"&&(change.target.matches?.("main .hero,main .hero *,#vnvHeaderAutoPopulate,#vnv333NetworkTicker,#vnvTickerAutoPopulate")))
     touched.push("attribute:"+change.attributeName);
  }
  if(touched.length)record("dom-change",[...new Set(touched)].join(","));
 });
 observer.observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:["class","style","hidden","aria-hidden"]});
}
document.addEventListener("DOMContentLoaded",()=>record("dom-content-loaded"),{once:true});
window.addEventListener("load",()=>record("load"),{once:true});
window.addEventListener("pageshow",()=>record("pageshow"));
window.addEventListener("error",e=>record("runtime-error",e.target?.tagName==="SCRIPT"?"script load failure":e.message||"unknown"),true);
window.addEventListener("unhandledrejection",e=>record("promise-rejection",e.reason?.message||"unknown"));
window.KhaemenesHomeHeroAudit=Object.freeze({version:"1.0",snapshot:metrics,events:()=>logs.slice(),stop:()=>{cancelAnimationFrame(raf);observer?.disconnect();record("stopped")}});
if(document.body)start();else document.addEventListener("DOMContentLoaded",start,{once:true});
})();
