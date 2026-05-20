# Git Rules

## Branch Naming

```
feature/homepage-car-grid
feature/ferrari-458-audio-engine
feature/tachometer-animation
fix/rpm-crossfade-3000
fix/audio-context-safari
chore/add-ferrari-audio-files
chore/setup-tailwind-tokens
refactor/extract-use-audio-hook
```

- Never work directly on `main`
- One feature or fix per branch
- Keep branch names lowercase with hyphens

---

## Commit Messages

Follow **Conventional Commits** format exactly:

```
<type>: <short description in lowercase>

Types:
  feat     → new feature or capability
  fix      → bug fix
  chore    → config, dependencies, assets, no logic change
  refactor → code restructure, no behavior change
  style    → formatting, Tailwind class changes only
  test     → adding or updating tests
  docs     → documentation only
```

Examples:
```
feat: add ferrari 458 audio engine with 4 rpm layers
feat: add tachometer needle with framer motion spring
fix: correct rpm crossfade gap at 3000 rpm
fix: resume audio context on safari after page hide
chore: add ferrari 458 audio files to public/sounds
chore: configure tailwind ferrari color tokens
refactor: extract useAudioEngine into custom hook
style: update accelerate button held state animation
test: add unit tests for rpm crossfade logic
```

---

## Commit Size

- Keep commits **small and focused** — one logical change per commit
- Never bundle unrelated changes in one commit
- Commit working code only — never commit broken builds

---

## Pull Requests

- PR title follows the same Conventional Commits format
- Every PR targets `main` (solo project — no develop branch needed)
- Squash merge to keep main history clean

---

## What Never Gets Committed

```
.env
.env.local
.env.production
node_modules/
.next/
*.mp3          (add via Git LFS or keep in /public with .gitignore note)
```

Add to `.gitignore`:
```
.env*
!.env.example
.next/
node_modules/
```