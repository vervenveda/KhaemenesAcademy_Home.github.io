# Public Academy Home boundary — review checklist (2026-11-09)

The Home repository is a **public, unauthenticated gateway**. Student, family, teacher and adult learner records belong to the dedicated Academy portals and eventually the authenticated STOS T03 Account Cloud.

## Staged change

- Removed eight imported operational modules from the Home page (family registry, learner context, mentor router, front-door learner router, learning continuation, parent action center, personalized home, and learning-science module).
- Kept the HTML's canonical entry links to the published central Academy and all six campus destinations.
- Preserved global ecosystem header, tickers, translator, campus phrase dictionary, public account-connection warning, and public information dialogs.
- Revised the hero to avoid promising verified cross-device account sign-in.
- Does **not** modify the central Academy, permissions, family records, or STOS.

## Verify before merge

1. Run `node --test tests/public-front-door.test.cjs` on the branch.
2. Browser-test desktop/tablet/mobile: front desk, school cards, help, account-continuity/offline dialogs, header, translator and mobile menu.
3. Verify direct navigation to Student / Family / Teacher / Adult routes; confirm real permissions are enforced **at each destination**, not in public HTML.
4. Check DevTools for JavaScript errors, failed CDN requests, layout overflow, duplicate header/ticker or translator controls.
5. Confirm no family activity, saved learner progress, account presence, or named learner information is rendered onto public Home.
6. Confirm other sites do not rely on public Home hosting the removed runtime globals. Keep any legitimate authenticated continuation logic in dedicated portals.

## Remaining limitations

Static route tests do not prove destinations are live or authenticated. Browser-local modules never constitute access authority. The page still uses external VNV shared scripts; the translator target `#vnv-language-switch` is dynamically added and must be checked in the browser. No live deployment or protected data migration is part of this review branch.
