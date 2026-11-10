# Backup Utility — Five-Bubble Forensic Hardening Pass
Date: 2026-11-09
Scope: Review branch, standalone `tools/record-backup/index.html`; **no learner records touched**.

## Findings and staged changes

1. **Duplicate file names (patched):** two different course exports can have the same filename. The tool now assigns collision-safe filenames before sealing, and again on restore to guard older archives. Original file bytes are unaffected.
2. **File size consistency (patched):** do not depend solely on `File.size`; count the actual bytes read and reject mismatch/over-limit before packaging.
3. **Malformed archive metadata (patched):** reject entries with invalid filename, non-integer/negative size, invalid SHA-256 digest encoding, or excessive decrypted package size before displaying downloads. Keep per-file hash and total-size checks.
4. **False completeness implication (copy hardened):** successful encryption is only evidence that *selected export files* were protected. It never establishes complete learner progress, every course origin, or a verified academic record.
5. **Restore proof (release gate):** the initial in-memory decrypt/verify does **not** prove that the archive was saved to disk or can be opened on another computer. Reopen the downloaded file with Step 2, verify retrieved bytes, then conduct an independent second-device recovery test before claiming durable preservation.

## Tests

Existing synthetic Web Crypto tests were extended for:
- Two same-named source exports with distinct contents and recovery names
- Mismatched actual read size
- Explicit incomplete-coverage warning in download status

Source/test JavaScript syntax inspection and static safety checks are possible through the GitHub connection; the Node runner, live browser and physical file-reopen tests have not yet been executed here. These tests are required for release.

## Security and privacy boundary

The tool is never an Academy record authority or an importer; it reads only user-selected exported files. No source localStorage is read, no network request is issued, and no personal file is committed to Git. The public repository remains unsuitable for readable student data. Cloud migration awaits authenticated STOS T03 and verified non-destructive recovery. Source exports must be retained until full backup inventory and restoration are verified.

## Follow-up gaps

- Full course-by-course Grade 9 export coverage still unverified
- Actual student device/origin records not backed up
- No approved encrypted storage destination selected
- Independent browser/Node security and performance audit pending
