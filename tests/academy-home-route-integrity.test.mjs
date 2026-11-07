import assert from "node:assert/strict";
import fs from "node:fs";
const html=fs.readFileSync(new URL("../index.html",import.meta.url),"utf8");
const CORE="https://vervenveda.com/Khaemenes_Academy.github.io/";
const expected={
  "Student Portal":"student/","Family Portal":"family/",
  "Teacher Portal":"teacher-admin/","Adult Portal":"adult/"
};
for(const [label,path] of Object.entries(expected)){
 assert.ok(html.includes(CORE+path),label+" canonical route missing");
}
for(const route of ["student/","family/","teacher-admin/","adult/","offline/"]){
 assert.ok(html.includes(CORE+route),route+" canonical destination missing");
}
for(const fragment of ["frontdesk","schools","services","beta","help"]){
 assert.match(html,new RegExp('id="'+fragment+'"'),fragment+" section absent");
}
assert.match(html,/academy-public-home-link-compatibility/);
assert.match(html,/const academyRoot="https:\/\/vervenveda\.com\/Khaemenes_Academy\.github\.io\/"/);
assert.match(html,/assets\/khaemenes-front-door-router\.js/);
assert.match(html,/assets\/vnv-header-autopopulate\.js/);
assert.match(html,/assets\/vnv-ecosystem-toolbar\.js/);
assert.match(html,/VNV_HEADER\.mount/);
assert.match(html,/VNV_TICKER\.autoPopulate/);
assert.ok(!/location\.(?:replace|assign)\(/.test(html),"No silent redirects from the public Academy front desk");
console.log("PASS: Academy Home static portal routes, canonical shared scripts, and section anchors.");
