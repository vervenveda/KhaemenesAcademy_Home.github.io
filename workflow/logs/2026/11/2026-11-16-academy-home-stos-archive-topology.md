# 2026-11-16 · Academy Home Repository Topology and Archival Workflow

- **Repository:** `vervenveda/KhaemenesAcademy_Home.github.io`
- **Types:** forensic source inspection · topology · workflow archival alignment
- **State:** Documentation committed; source site unchanged; live browser checks HOLD.

## Confirmed topology

Academy Home is its own landing/entry repository. The checked root contains `index.html`, `README.md`, `SECURITY.md`, `.github/`, `tests/`, and a preexisting `workflow/` archive.

The current `index.html` is approximately 47 KB and has 48 static links and four button declarations. It displays sections for the Academy, Front Desk, Academy Compass, Find My School/Tool, Administrative Desk and Help Desk. Source declarations show shared Academy modules for family registry, learner context, routing, continuation, parent actions, personalization, learning science and connection status.

The Academy Home page currently imports these modules via absolute paths into `vervenveda.com/Khaemenes_Academy.github.io/assets/`. It also imports the VNV header, 333 ticker, auto-populated ticker and ecosystem toolbar. **Dependency reachability and browser behavior have not been verified in this inspection.**

The full Academy repository currently has its own Academy `index.html` (approximately 40 KB), which is not byte-identical to Academy Home; do not force a blind merge. The separate minimal Academy front door also contains an `index.html` and a `workflow/` archive.

## Archival and sovereignty decision

1. Keep detailed Academy Home audit and changes here, using the shared `workflow/README.md`, `workflow/INDEX.md`, and session template.
2. Keep full Academy application records in `vervenveda/Khaemenes_Academy.github.io/workflow/`.
3. Keep the public Academy front door minimal and do not store student records, privileged operations or duplicated back-end infrastructure in it.
4. Prepare STOS-native, allowlisted, fail-closed synchronization specifications **only on paper** until the owner explicitly authorizes and verifies terminal commissioning.
5. Do not alter DNS, `CNAME`, public account endpoints or learner data as part of this archival audit.

## Next audit

- [ ] Inspect all student/parent/educator entry buttons for actual published destinations (never bare GitHub repositories).
- [ ] Compare Academy Home with full Academy entry page on navigation, heading, duplicate header/ticker/toolbar instances, and accessible sizes.
- [ ] Validate dependency URL reachability, offline behavior and identity boundaries.
- [ ] Build an explicit, reversible STOS manifest and test plan once terminal identity/binding is verified.

No runtime or source navigation code was changed in this session.
