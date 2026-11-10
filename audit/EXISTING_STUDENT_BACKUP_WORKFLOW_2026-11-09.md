# Existing Student Backup — Home Front Door Handoff
Date: 2026-11-09
Status: Review branch only, no production deployment.

## Sources inspected
- Central Academy `assets/khaemenes-family-backup-vault.js`: family backup format `khaemenes-family-backup-v2` uses a SHA-256 integrity check and family-export validation. Its stated exclusions include course grades, assessment attempts and private learner reflections.
- Central Academy `family/index.html`: existing Family Backup Tools at `#family-records-controls`. The page says family identity backup does not cover all course records.
- Grade 9 Student Portal, campus and independent course systems were previously inventoried for record-preserving Account Cloud migration.

## Stage completed
A collapsible guide was added to Home's Account Continuity dialog:
1. Verified family backup on original browser.
2. Course-by-course backups (assessments, writing, portfolios and journals).
3. Check downloadable files and maintain an independent protected copy.
4. Preserve browser originals until verified authenticated cloud storage and cross-device restoration.
These are instructions only; the public home does not collect student data, create backup files or run cloud writes.

## Temporary private GitHub storage decision
The accessible `vervenveda` account lists three private repositories: `Khaemenes_Assessment_Authority`, `spyder-cloud`, and `333-Network-Private-Core`. None is verified as an approved encrypted student-backup destination. Do not mix student records into assessment-authority, security, or unrelated operational repositories. No private backup vault was created, selected or written to. A purpose-built vault would require privacy controls, client-side encryption, key recovery and approval before any archive upload.

## Outstanding release conditions
- Actual learner exports from their original device and origins are still absent.
- Family integrity check is not a substitute for an independent second-copy restore test or at-rest encryption.
- All Grade 9 course producers and foreign-language/elective origins must be inventoried.
- T03 authenticated storage, atomic receipts and restore not yet certified.
- Full Node and live browser tests are pending before merging this review branch.
