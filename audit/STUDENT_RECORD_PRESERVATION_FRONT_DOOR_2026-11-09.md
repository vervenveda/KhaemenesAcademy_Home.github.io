# Academy Home — student-record preservation handoff
Date: 2026-11-09
Status: review branch only; no deployment or learner import.

## Purpose
Keep the public Academy Home as a safe front desk for existing learner recovery, family backup, course-level export, and the future protected Account Cloud. A student-specific backup is never put into this public repository.

## Verified existing routes
- Existing learner recovery: `https://vervenveda.com/Khaemenes_Academy.github.io/student/`
- Family backup controls: `https://vervenveda.com/Khaemenes_Academy.github.io/family/#family-records-controls`
- Family Portal documentation explicitly states the family backup does not include course-owned grades and assessment records.

## Public front-door guardrail
The existing Account Continuity dialog now makes the family/course split explicit, links to the verified backup tools, and warns users not to create a duplicate learner record or publish readable records in a public repository. The public Home never handles learner files or local storage.

## Private retention path — NOT implemented
1. Obtain a consented export from the learner's original browser and each course origin. Keep learner ID and source key intact.
2. Independently verify each backup's integrity and recovery, retain original device records.
3. If a GitHub-based temporary vault is approved, it must be a separate access-restricted private repository containing only client-side-encrypted archives, never plaintext, passwords, recovery secrets, or record contents. Git history and collaborator access must be treated as part of the retention and disclosure risk.
4. Private GitHub backup is not an authenticated Academy record database, is not officially graded evidence, and does not equal active T03 persistence.
5. Complete STOS T03 authenticated binding, atomic record/audit/receipt storage, owner and student authorization, second-device restore test, then approve non-destructive import.

## Gaps
- No actual student data was exported, uploaded, or backed up through this source patch.
- Existing Family backup protects family records only; separate course exports remain essential.
- No verified private backup target or approved encryption/key recovery workflow was established.
- Source-level tests were added; Node/browser end-to-end behavior has not been run.
