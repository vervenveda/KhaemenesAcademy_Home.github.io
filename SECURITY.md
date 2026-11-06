# Security Policy

**Khaemenes Academy — Public Front Door**  
Repository: `vervenveda/KhaemenesAcademy_Home.github.io`

Khaemenes Academy is committed to a safe, accessible educational experience for students, families, educators, and visitors. We welcome responsible reports of security issues affecting this public-facing entry point.

## Scope and supported version

This repository contains the **public Academy landing page**. The currently deployed version of the `main` branch, when published, is the supported version for security fixes. Historical commits, forks, unofficial mirrors, and outdated deployments are not supported.

This policy covers security defects in the front door itself, including unsafe navigation or redirects, malicious or compromised browser-delivered dependencies, injection vulnerabilities, misleading security or account-status claims, and inadvertent exposure of sensitive information.

The front door links to other Academy websites and loads approved public scripts from the Academy and Verve N Veda ecosystem. Those systems have their own source and operating boundaries. A finding in another repository should be reported to that project's maintainers; include this repository in the report when its front-door integration contributes to the problem.

## Public front door is not a security boundary

This is an intentionally public GitHub repository. Its HTML and all browser-delivered JavaScript, CSS, and network requests must be treated as inspectable and copyable.

The front door is a navigation and presentation layer, **not** an authentication system, protected data store, secret vault, or server-side access-control mechanism. A separate public landing page does not make the connected public Academy repository private.

Do not place any of the following in this repository, its commits or history, GitHub Actions logs, public assets, or client-side configuration:

- Passwords, API keys, access tokens, signing keys, recovery codes, or private cryptographic material.
- Personally identifiable student or family records, protected educational records, or private communications.
- Non-public administrator credentials, privileged service endpoints, or security-sensitive infrastructure details.
- Supposedly hidden secrets in HTML comments, source maps, obfuscated JavaScript, or build artifacts.

Any future server-connected account, progress-sync, or administrative capability must verify identity and authorization on the trusted server side. Browser `localStorage`, visual controls, obscured URLs, and client-side permission flags are not sufficient authorization.

## Report a vulnerability privately

**Do not publish exploit details, credentials, student information, or proof-of-concept payloads in a public GitHub issue, discussion, pull request, or social-media post.**

If GitHub's private vulnerability reporting is enabled for this repository, use its **Security → Report a vulnerability** flow. If that option is unavailable, contact the repository maintainers through an established private channel and request a secure reporting method before sending sensitive details.

A useful report includes:

1. A concise description of the issue and its likely impact.
2. The affected URL or file path and the date observed.
3. Reproduction steps using only your own test data and authorized accounts.
4. Relevant browser/version information and redacted evidence.
5. Any immediate mitigation recommendation.

Never include a child's actual account data, an unrelated person's personal information, or working secrets in your report.

We will review actionable reports and coordinate remediation and disclosure where possible. **No fixed response-time or bounty commitment is made by this policy.**

## Responsible testing

You may examine publicly served code and perform non-disruptive testing against your own accounts or test data. Please:

- Avoid accessing, altering, exporting, or attempting to identify other people's records.
- Do not run denial-of-service tests, disruptive automation, credential attacks, social engineering, or phishing.
- Do not attempt to bypass authorization on connected third-party services.
- Stop testing and report privately if you encounter private records, credentials, or an unexpectedly accessible administrative function.
- Allow maintainers an opportunity to investigate before publishing technical exploit details.

This policy does not authorize access to any system, account, repository, or infrastructure beyond permissions already granted to you.

## Security practices and dependencies

Changes to the public front door should preserve the following rules:

- **Least exposure:** keep the repository restricted to intentionally public files and assets.
- **Approved destinations:** use vetted HTTPS URLs for external scripts, navigation, and dependencies; scrutinize changes to their owners and paths.
- **Fail safely:** never present a missing or unverified account-cloud connection as authenticated, synchronized, or protected.
- **No privileged client logic:** validate authorization and sensitive writes in a trusted service when such functionality exists.
- **Idempotent UI:** mounting a header, ticker, toolbar, or navigation module repeatedly must not create duplicate elements, event handlers, or unintended actions.
- **Continuity:** preserve functioning student, family, teacher, and learning links when changing the public entry point.
- **Minimal permissions:** limit repository and deployment write access, review changes, and protect publishing credentials.
- **Separation:** keep dormant infrastructure and privileged implementation details outside public delivery.

GitHub Pages and other static hosting services do not, by themselves, provide private per-user storage or trusted application authentication.

## Security incidents

If secrets or sensitive records are discovered in publicly accessible material, notify maintainers privately as soon as possible. Remediation may require revoking or rotating exposed credentials, disabling affected functionality, removing exposed materials from current publication, evaluating repository history and caches, and assessing notification obligations. Removing a file in a later commit does not erase its earlier public exposure.

## Related properties

- [Khaemenes Academy public front door](https://vervenveda.com/KhaemenesAcademy_Home.github.io/)
- [Verve N Veda gateway](https://vervenveda.com/)
- [Khaemenes Academy educational campus](https://vervenveda.com/Khaemenes_Academy.github.io/)

**Last updated:** November 6, 2026.
