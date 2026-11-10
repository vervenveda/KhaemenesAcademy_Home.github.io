# Academy Local Encrypted Backup — Staging & Safeguards

Date: 2026-11-09
Repository: `vervenveda/KhaemenesAcademy_Home.github.io`
Branch: `hardening/public-front-door-isolation-2026-11-09`
Status: **standalone review-branch utility, not on live navigation or production; not a cloud backup**.

## Intended purpose

Provide a local-only *secondary protection layer* for export files already created by the Academy Family Portal and individual course engines. It does not locate missing records, read browser localStorage, collect all course origins automatically, authenticate learner identity, or issue official grades.

The learner's original course, assessment, notes, grade, journal and portfolio data must be exported from each originating site/device before this tool can protect a copy.

## Implementation staged

- `tools/record-backup/index.html`: self-contained HTML with no remote JavaScript, images or network calls.
- Opt-in selection of 1–30 prior source-export files, up to 20 MiB combined.
- Web Crypto PBKDF2-HMAC-SHA-256 with 310,000 iterations and a fresh 16-byte salt; AES-256-GCM with a fresh 12-byte nonce.
- Original filename, original content bytes and SHA-256 digest encrypted together; no learner identifier or source filename stored in plaintext envelope metadata.
- An encrypted JSON container is downloaded **only after** decrypting it again in memory and validating every original source file's hash and byte length.
- Separate unlock/verify path recovers the originals as downloads, with no automatic restoration into academic records.
- No browser storage writes, automatic uploads, or GitHub data transfer. The tool does not collect passphrases.
- Explicit warnings that a recovery passphrase is necessary and cannot be recovered by the public Academy or GitHub.

## Tests / release criteria

The following tests are staged in `tests/record-backup.test.cjs`:
- Byte-identical synthetic round-trip of a source export
- Rejection of wrong passphrase
- No network/localStorage and no third-party scripts
- Input error handling without a backup download

Source and test JavaScript syntax validation **passed**, and static checks found the network-disabled CSP, cryptographic primitives and round-trip verification. The actual Node WebCrypto test suite has **not** been run in this session (repository files were accessible through the connected GitHub tool but not the local Node workspace). Browser tests and independent second-device restore are also outstanding.

Do not present the encryption method or UI as production-approved until an independent cryptographic/security review and full functional test have passed. Users should retain their source exports and a separate encrypted backup in an approved location.

## Blockers before any learner upload

1. Verify all original source exports and learner ownership; no silent or mistaken assignment.
2. Select a dedicated approved storage destination with controlled access and documented retention/incident-response rules. Existing assessment and security repositories must not be reused for student archives.
3. Verify passphrase custody, secure restoration and independent backup location.
4. Commission protected T03 authenticated storage and transaction receipts, then test synthetic cross-device recovery.
5. Only after all applicable acceptance conditions may real learner data move to Account Cloud.

No real learner record, private archive, family identity or live STOS state was modified.
