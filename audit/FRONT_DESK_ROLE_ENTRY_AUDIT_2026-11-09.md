# Front Desk role entry audit — 2026-11-09

Scope: public Academy Home review branch, published default-branch source for central Academy `student/index.html`, `family/index.html`, `teacher-admin/index.html`, `adult/index.html`, and local routing/registry scripts. Repository-source inspection only, not a deployed-browser or live authentication test.

## Source-confirmed role flow

| Entrance | Source behavior | Boundary |
| --- | --- | --- |
| Student | Existing local learners can be selected; no learner leads to backup/recovery and new-enrollment guidance. K–12 classrooms remain browseable. An active adult learner routes to Adult. | Local learner selection is not sign-in. |
| Family | Existing local family can be selected, backup restored, or provisional family intake started. | Family UI expressly says verified cloud sign-in is not available. |
| Teacher | Page says 'Public teacher resource page', links to faculty materials and provides local evidence review queue. `Resolve` and `Reopen` mutate `localStorage` evidence-review records only; these are not formal authorized decisions. | Public access to teacher-advisory content must not be described as protected administration. |
| Adult | Adult profile setup and continuation is separate from enrolling a child. When a selected adult scholar exists, the page displays self-directed study links. | Local scholar context is not verified cloud authentication. |

## Completed safe public Home repair

Renamed the Teacher Front Desk action from `Administration` to `Teacher Resources`, clarified that the destination is a public resource page and protected actions need separate authorized access, and made the Help Desk label consistent. All `teacher-admin/` destination URLs remain unchanged.

## Risk register / future separate audits

1. Teacher evidence queue currently offers `Resolve` and `Reopen` without a server-authenticated teacher session. Since the records are browser-local, do not mistake those transitions for authoritative decisions. Keep this queue in the public advisory category or relocate formal workflow to a protected service.
2. Family registry's `setActive` explicitly says selection is not authentication. No public gateway label should imply secure multi-device account persistence until STOS T03 is verified.
3. Student selection enumerates locally stored learners and includes profile recovery guidance. Check permission boundaries and learner visibility with synthetic families before making routing changes.
4. Adult student-to-adult redirect is intentional but must be checked for mixed parent/adult profiles.
5. Live browser test remains necessary: new visitor, one student, multiple students, family with adults, teacher public access, and adult scholar; verify private records stay isolated.

No central Academy destination code, identity authority, family records, assessment scores, or STOS state changed in this patch.
