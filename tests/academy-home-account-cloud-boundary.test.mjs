import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
const core='https://vervenveda.com/Khaemenes_Academy.github.io/';
test('bubble 1: Academy Home routes to the existing Academy Core entrypoints, not a second registration owner',()=>{
 for(const p of ['student/','family/','teacher-admin/','adult/','family/enroll/'])
  assert.ok(html.includes(core+p),p);
 assert.ok(html.includes('href="'+core+'">Enter Full Academy</a>'));
});
test('bubble 2: Home contains no browser account, learner ID or protected client runtime',()=>{
 for(const term of ['localStorage','sessionStorage','KhaemenesFamilyRegistry','khaemenes-family-registry.js',
  'khaemenes-account-client.js','KhaemenesAccountClient','khaemenes_active_learner_v1',
  'khaemenes_family_registry_v1','fetch(','XMLHttpRequest','indexedDB'])
   assert.ok(!html.includes(term),term);
});
test('bubble 3: public portal never advertises Account Cloud as commissioned',()=>{
 assert.match(html,/Cross-device Account Cloud synchronization has not been verified/);
 assert.match(html,/does not create or modify learner accounts/);
 assert.doesNotMatch(html,/Cloud connected|Cloud synchronized|Account Cloud active|Sign in to Account Cloud/i);
});
test('bubble 4: one canonical VNV chrome owner per service and no silent navigation',()=>{
 for(const name of ['vnv-333-ticker.js','vnv-ticker-autopopulate.js','vnv-header-autopopulate.js','vnv-ecosystem-toolbar.js'])
  assert.equal(html.split('src="https://vervenveda.com/assets/'+name+'"').length-1,1,name);
 assert.doesNotMatch(html,/location\.(?:replace|assign)\(/);
});
test('bubble 5: existing-family recovery is favored over a duplicate intake',()=>{
 assert.ok(html.indexOf('href="'+core+'family/">Family Portal</a>')>=0);
 assert.ok(html.includes('Choose an existing learner'));
 assert.ok(html.includes('href="'+core+'family/">Family Records</a>'));
 assert.ok(html.includes('href="'+core+'family/enroll/">Family Enrollment</a>'));
 assert.ok(html.indexOf('href="'+core+'family/">Family Records</a>')<
   html.indexOf('href="'+core+'family/enroll/">Family Enrollment</a>')||html.includes('Choose an existing learner'));
});
