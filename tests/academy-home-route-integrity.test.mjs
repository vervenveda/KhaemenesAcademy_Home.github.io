import assert from "node:assert/strict";
import fs from "node:fs";
const html=fs.readFileSync(new URL("../index.html",import.meta.url),"utf8");
const CORE="https://vervenveda.com/Khaemenes_Academy.github.io/";
const expected={
 "Student Portal":"student/","Family Portal":"family/",
 "Teacher Portal":"teacher-admin/","Adult Portal":"adult/"
};
for(const [label,path] of Object.entries(expected)){
 assert.ok(html.includes('href="'+CORE+path+'">'+label+"</a>"),"Primary entrance not linked to Full Academy: "+label);
}
for(const route of ["student/","family/","teacher-admin/","adult/","offline/","family/enroll/"]){
 assert.ok(html.includes(CORE+route),"Canonical route missing: "+route);
}
assert.ok(html.includes('href="'+CORE+'">Enter Full Academy</a>'),"Direct Full Academy handoff missing");
for(const id of ["main","frontdesk","schools","services"]){
 assert.match(html,new RegExp('id="'+id+'"'),"Landing section missing: "+id);
}
for(const file of ["vnv-333-ticker.js","vnv-ticker-autopopulate.js","vnv-header-autopopulate.js","vnv-ecosystem-toolbar.js"]){
 assert.equal(html.split('src="https://vervenveda.com/assets/'+file+'"').length-1,1,"Expected exactly one VNV chrome script: "+file);
}
assert.match(html,/VNV_HEADER\?\.mount\?\./);
assert.match(html,/VNV_TICKER\?\.autoPopulate\?\./);
for(const forbidden of ["khaemenes-family-registry.js","khaemenes-front-door-router.js","khaemenes-home-personalization.js","khaemenes-parent-action-center.js","localStorage","sessionStorage"]){
 assert.ok(!html.includes(forbidden),"The landing must not own learner identity or account state: "+forbidden);
}
assert.ok(!/location\.(?:replace|assign)\(/.test(html),"Do not silently redirect from the landing page");
console.log("PASS: lightweight Academy Home, direct Full Academy routes and single VNV chrome ownership");
