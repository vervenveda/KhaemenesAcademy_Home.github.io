/* Academy Home static regression tests: no accounts, storage, browser or network access.
 * Run: node --test tests/public-front-door.test.cjs
 */
"use strict";
const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const html=fs.readFileSync(path.join(__dirname,"../index.html"),"utf8");
const academy="https://vervenveda.com/Khaemenes_Academy.github.io/";
const operational=[
  "khaemenes-family-registry.js","khaemenes-learner-context.js",
  "khaemenes-naib-mentor-router.js","khaemenes-front-door-router.js",
  "khaemenes-learning-continuation.js","khaemenes-parent-action-center.js",
  "khaemenes-home-personalization.js","khaemenes-learning-science.js"
];
const importedSources=()=>[...html.matchAll(/<script\s+[^>]*src="([^"]+)"/g)].map(m=>m[1]);
test("gateway excludes operational family and learner scripts",()=>{
  const sources=importedSources();
  for(const file of operational)assert.ok(sources.every(src=>!src.includes("/"+file)),file);
});
test("all direct Academy portals remain",()=>{
  for(const suffix of ["student/","family/","teacher-admin/","adult/"])
    assert.ok(html.includes('href="'+academy+suffix+'"'),suffix);
});
test("six campus routes remain",()=>{
  for(const name of ["Khaemenes_Preschool.github.io/","Khaemenes_KinderGarden.github.io/",
    "Khaemenes_Elementary.github.io/","Khaemenes_Middle.github.io/",
    "Khaemenes_High.github.io/","Khaemenes_Higher_Learning.github.io/start/"])
    assert.ok(html.includes('href="https://vervenveda.com/'+name+'"'),name);
});
test("cloud disclosure and offline entry remain",()=>{
  assert.ok(html.includes("Account Cloud connection is not verified"));
  assert.ok(html.includes(academy+"offline/index.html"));
});
test("shared UI and translation imports remain",()=>{
  for(const name of ["vnv-header-autopopulate.js","vnv-333-ticker.js",
    "vnv-ticker-autopopulate.js","vnv-ecosystem-toolbar.js","vnv-language.js"])
    assert.ok(importedSources().some(src=>src.endsWith("/"+name)),name);
});
test("static IDs are unique",()=>{
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(ids.length,new Set(ids).size);
});
test("static page has no local account operations",()=>{
  assert.ok(!html.includes("localStorage")&&!html.includes("sessionStorage")&&!html.includes("document.cookie"));
  assert.ok(!/\bfetch\s*\(/.test(html));
});
test("ticker initialization precedes canonical header",()=>{
  const sources=importedSources();
  const index=name=>sources.findIndex(src=>src.endsWith("/"+name));
  assert.ok(index("vnv-333-ticker.js")>=0);
  assert.ok(index("vnv-333-ticker.js")<index("vnv-ticker-autopopulate.js"));
  assert.ok(index("vnv-ticker-autopopulate.js")<index("vnv-header-autopopulate.js"));
  assert.ok(html.includes('document.addEventListener("DOMContentLoaded",mount,{once:true})'));
  assert.ok(html.includes('window.VNV_HEADER?.mount('));
});
test("hero diagnostic remains opt-in",()=>{
  assert.ok(importedSources().includes("assets/khaemenes-home-hero-audit.js"));
  assert.ok(html.includes("?hero_audit=1"));
});

test("Beta feedback action targets published form anchor",()=>{
  assert.ok(html.includes('href="https://vervenveda.com/beta/#betaForm"'));
  assert.ok(!html.includes('https://vervenveda.com/beta/#feedback'));
});
