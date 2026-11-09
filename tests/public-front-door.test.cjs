/* Synthetic static regression for the Academy public front door.
 * Run: node --test tests/public-front-door.test.cjs
 * No student records, network access, credentials, or browser storage required.
 */
"use strict";
const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const html=fs.readFileSync(path.join(__dirname,"../index.html"),"utf8");
const academy="https://vervenveda.com/Khaemenes_Academy.github.io/";
const privateModules=[
  "khaemenes-family-registry.js",
  "khaemenes-learner-context.js",
  "khaemenes-naib-mentor-router.js",
  "khaemenes-front-door-router.js",
  "khaemenes-learning-continuation.js",
  "khaemenes-parent-action-center.js",
  "khaemenes-home-personalization.js",
  "khaemenes-learning-science.js"
];
test("public gateway does not import learner or family operational modules",()=>{
  for(const file of privateModules)
    assert.doesNotMatch(html,new RegExp("<script[^>]+src=[\\\"'][^\\\"']*"+file.replaceAll(".","\\.")+"(?:\\?[^\\\"']*)?[\\\"']"),file);
});
test("direct, usable entry doors remain present",()=>{
  for(const suffix of ["student/","family/","teacher-admin/","adult/"])
    assert.ok(html.includes('href="'+academy+suffix+'"'),"missing "+suffix);
});
test("all six campus doors remain",()=>{
  for(const path of [
    "Khaemenes_Preschool.github.io/",
    "Khaemenes_KinderGarden.github.io/",
    "Khaemenes_Elementary.github.io/",
    "Khaemenes_Middle.github.io/",
    "Khaemenes_High.github.io/",
    "Khaemenes_Higher_Learning.github.io/start/"
  ])assert.ok(html.includes('href="https://vervenveda.com/'+path+'"'),path);
});
test("cloud disclosure and offline door remain",()=>{
  assert.match(html,/Account Cloud connection is not verified/);
  assert.ok(html.includes(academy+"offline/index.html"));
});
test("global tools and translations remain",()=>{
  for(const file of ["vnv-header-autopopulate.js","vnv-333-ticker.js","vnv-ticker-autopopulate.js","vnv-ecosystem-toolbar.js","vnv-language.js"])
    assert.ok(html.includes(file),file);
});
test("no duplicate static IDs",()=>{
  const ids=[...html.matchAll(/\\bid="([^"]+)"/g)].map(x=>x[1]);
  assert.equal(ids.length,new Set(ids).size);
});
test("no local sign-in or inline network fetch",()=>{
  assert.doesNotMatch(html,/\\b(?:localStorage|sessionStorage|document\\.cookie)\\b/);
  assert.doesNotMatch(html,/\\bfetch\\s*\\(/);
});

test("ticker scripts precede canonical header mounting",()=>{
 const t333=html.indexOf('src="https://vervenveda.com/assets/vnv-333-ticker.js"');
 const auto=html.indexOf('src="https://vervenveda.com/assets/vnv-ticker-autopopulate.js"');
 const header=html.indexOf('src="https://vervenveda.com/assets/vnv-header-autopopulate.js"');
 assert.ok(t333>=0&&auto>t333&&header>auto,"ticker/header script order");
 assert.ok(html.includes('document.addEventListener("DOMContentLoaded",mount,{once:true})'),"header waits for 333 mount");
 assert.equal((html.match(/VNV_HEADER\\?\.mount\\(/g)||[]).length,0,"avoid unguarded header mount");
});
test("hero probe is explicitly opt-in and separate from public account data",()=>{
 assert.match(html,/assets\\/khaemenes-home-hero-audit\\.js/);
 assert.match(html,/hero_audit=1/);
});
