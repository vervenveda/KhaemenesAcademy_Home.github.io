# Academy Home hero layer forensic audit — November 9, 2026

## Scope and source evidence

Examined `index.html` on current public `main` and the `hardening/public-front-door-isolation-2026-11-09` review branch, plus shared VNV header and ticker scripts. No student records or STOS terminal state accessed.

## Hero layers

1. Static `section.hero`: dark layered radial and linear gradients, a decorative `::before` KA watermark, and a grid-centered `.hero-inner`.
2. Text stack: eyebrow, H1, subtitle, descriptive paragraph and CTA row; heading typography consolidated on the review branch.
3. Front Desk overlap: `.frontdesk` has negative top margin; a change to ticker/header or font metrics can move its apparent boundary relative to the hero.
4. Shared VNV header: JavaScript injects `#vnvHeaderAutoPopulate` at runtime, computes ticker height and updates the CSS variable `--vnv-header-top`.
5. Shared 333 ticker: runtime insertion into the DOM; its track intentionally uses a 26-second linear infinite scrolling animation.
6. Shared Auto ticker: runtime insertion; its track intentionally uses a 33-second linear infinite scrolling animation.
7. Utility toolbar and translation scripts: may add controls after initial HTML parse.
8. Legacy header styles on Home: CSS targets an older `header[data-khae-header]` pattern even though no static `<header>` exists in `index.html`. The injected canonical header is a separate component.

## Findings

- The static hero has no CSS keyframe animation in the Home HTML. Therefore repeated hero flashing is not explained by an authored hero animation.
- Header creation and ticker placement happen after HTML parsing. A one-time layout shift or flicker during first load is plausible, but not proven without the browser timeline.
- Header and tickers are actively animated/repositioned independently; the fixed/sticky top stack requires runtime sync.
- The supplied Grade 9 opt-in diagnostic PDF documents an analogous non-invasive Chrome probe approach. It does not prove the current Home page has the same runtime error.
- The provided STOS terminal profile parser/equality/identity-hold excerpts are unrelated to public hero DOM layers.

## Instrumentation staged

`assets/khaemenes-home-hero-audit.js` is imported immediately before the shared header/ticker scripts. It activates only with `?hero_audit=1`; reports the hero/title boxes, display/visibility/opacity/animation name, the header/ticker/menu element counts and boxes, DOM insertion/removal/attribute changes, and script/runtime errors. It does not read account data, cookies, local storage, or make network requests.

## Manual browser acceptance

1. Once the review branch is actually deployed to a preview, open `?hero_audit=1` and reload at 100% zoom.
2. Observe whether flashing is the hero title, the background, a moving ticker, or the entire page.
3. Capture `KhaemenesHomeHeroAudit.snapshot()` and `KhaemenesHomeHeroAudit.events()` from DevTools; avoid sending personal information.
4. Observe the first 10 seconds after reload, then scroll away and back. Compare initial-only movement versus repeated change.
5. Check DevTools Console for script load errors and computed CSS for `hero`, `hero:before`, and `#vnvHeaderAutoPopulate`.
6. Retest at 375px, 768px, and desktop width, and with reduced-motion preferences.
7. Only then choose the smallest fix: reserve ticker height, reorder initialization, or remove a competing legacy style as indicated by actual timeline evidence.

No repository main branch, deployed page, or student data is modified by these audit additions.
