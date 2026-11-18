# November 18, 2026 · Academy Home becomes a lightweight public landing page

## Trigger
Reported broken links and a duplicated Academy front desk. Goal: preserve Academy Home as a welcome/entry page while making the Full Academy the sole family, student, teacher, adult and enrollment application.

## Source-level repair
- Replaced the 46,744-character public Academy Home `index.html` with an 8,140-character static, centered welcome page.
- Primary 2×2 entrances link **directly** under `https://vervenveda.com/Khaemenes_Academy.github.io/`: Student `student/`, Family `family/`, Teacher `teacher-admin/`, Adult `adult/`.
- Added clear **Enter Full Academy** path; secondary directory, enrollment, offline and VNV return links point to appropriate page locations.
- Removed duplicate Family Registry, NAIB, learner context, full front-door router, continuation, personalization, and parent action components from the *landing only*. This page no longer attempts family account reads/writes or learner placement. Full Academy remains the sole identity and service authority.
- Kept one each of official VNV 333 ticker, auto ticker, header with branched hamburger, and ecosystem utility toolbar.
- Updated `tests/academy-home-route-integrity.test.mjs` to require exact four Full Academy portal destinations and prohibit duplicated family/account runtime.
- Tested public Full Academy `/`, `family/`, `family/enroll/`, `student/`, `teacher-admin/`, and `adult/` HTTP retrieval successfully via external source inspection. This **does not** prove browser click/interactive acceptance.
- Focused **Academy Home Route Integrity** GitHub Actions passed on updated test commit `683e1ff855c6a59d6d28cf7fef857a2100ba4fd7`.

## Release blockers
- `https://vervenveda.com/KhaemenesAcademy_Home.github.io/` itself was not retrievable from the external browser tool at inspection. Prior Pages deployment was green, but current updated deployment and custom-domain/path delivery must be independently verified. **Do not declare that the broken public landing URL is fixed yet.**
- The separately private `KhaemenesAcademy/KhaemenesAcademy.github.io` future front door is not automatically synchronized with this public Home and was not modified.
- Account Cloud/Terminal 03 remains unverified; same-origin browser-local records are not cross-device storage. No student or family data was changed.

## Follow-up
Confirm the Academy Home Pages publication mapping and VNV gateway link behavior in a real browser; then run visitor, selected learner, and family links under the final published URL. Once confirmed, synchronize only the desired minimal public-entry blueprint to the separate future front door, retaining separate deployment and security boundaries.
