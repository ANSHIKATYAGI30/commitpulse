## Description

Fixes #584

## Pillar

- [ ] 🎨 Pillar 1 — New Theme Design
- [ ] 📐 Pillar 2 — Geometric SVG Improvement
- [ ] 🕐 Pillar 3 — Timezone Logic Optimization
- [x] 🛠️ Other (Bug fix, refactoring, docs)

## Visual Preview

No visual changes. This implements an in-memory sliding-window IP rate limiter on the `/api/track-user` endpoint to prevent "Denial of Wallet" and database bloating through automated spam.

## Checklist before requesting a review:

- [x] I have read the `CONTRIBUTING.md` file.
- [x] I have tested these changes locally (`localhost:3000/api/streak?user=YOUR_USERNAME`).
- [x] I have run `npm run format` and `npm run lint` locally and resolved all errors (CI will fail otherwise).
- [x] My commits follow the Conventional Commits format (e.g., `feat(themes): ...`, `fix(calculate): ...`).
- [x] I have updated `README.md` if I added a new theme or URL parameter.
- [x] I have started the repo.
- [x] I have made sure that i have only one commit to merge in this PR.
- [x] The SVG output matches the CommitPulse "premium quality" aesthetic standard (no raw elements, smooth animations, correct fonts).
- [x] (Recommended) I joined the CommitPulse Discord server for faster collaboration, mentorship, and PR support.
