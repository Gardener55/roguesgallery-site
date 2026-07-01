# The Rogue's Gallery — Website Theme (Source of Truth)

This document + [`styles.css`](styles.css) define the **canonical look of
roguesgallery.app**. Every future change to this site MUST follow this theme.
When a page and this document disagree, this document and `styles.css` win.

> **For anyone (human or AI) editing this site:** all three pages
> (`index.html`, `privacy.html`, `support.html`) link the single shared
> `styles.css`. Build from its classes and tokens. **Never** hardcode a color,
> font, or spacing value in a page — add/extend a token in `styles.css` so every
> page inherits it.

---

## The Aesthetic

A fusion of two design systems (from getdesign.md):

- **Lamborghini** — *true-black surfaces, gold accents, dramatic uppercase
  typography.* The brand mood: premium, austere, a little dangerous —
  treasure-and-danger energy for a gallery of roguelike card games. (The flagship
  game Scoundrel already uses this gold, `#d4af37`, as its in-app accent.)
- **PlayStation** — *multi-surface depth, quiet-authority type, hover-scale
  tiles.* The layout: games are a storefront gallery of tiles, each leading with
  its own accent color, that lift and glow on hover.

**One line:** *Lamborghini skin, PlayStation bones.*

---

## Design Tokens (defined at the top of `styles.css`)

| Token | Value | Use |
|---|---|---|
| `--bg` | `#050505` | Page canvas (**true black** — never lighten to navy/gray) |
| `--bg-2` | `#0c0c0d` | Alternate section band |
| `--panel` / `--panel-2` | `#141416` / `#1d1d20` | Card surface / hover |
| `--gold` | `#d4af37` | **Primary accent** — the only global accent |
| `--gold-2` | `#f0d77a` | Bright highlight |
| `--gold-deep` | `#8a6d2f` | Gradient/shadow |
| `--text` / `--muted` | `#f4f4f5` / `#a9a9ad` | Text hierarchy |
| `--border` / `--border-gold` | white 8% / gold 35% | Hairlines |
| `--font-display` | Oswald | Headings, buttons, labels — always UPPERCASE + tracked |
| `--font-body` | system sans | Paragraphs, descriptions (normal case) |
| `--radius-card` / `--radius-btn` | `10px` / `2px` | Angular, hypercar-minimal geometry |

> Some class names carry meaning the markup depends on — keep them: per-game tile
> color is passed inline as `style="--c:#hex"`, and `support.html` references
> `var(--text)` inline. Don't rename `--c`, `--text`, or `--gold`.

---

## Rules for Future Changes

1. **Link the shared stylesheet.** Any new page must
   `<link rel="stylesheet" href="styles.css">` and reuse existing classes.
2. **No one-off design values.** Page-level `<style>`/inline styles are for layout
   composition only. New design values become tokens in `styles.css`.
3. **Display font is for LARGE headings only.** The Oswald uppercase display
   font is reserved for big, short text: the hero wordmark (`h1`), section
   titles (`h2`), the brand/footer-brand, and the nav button. **Small in-tile
   text stays in the readable body font** (mixed case): game-card titles
   (`.game-card h3`), game taglines (`.game-sub`), the hero `.tagline`,
   `.hero-meta`, feature headings (`.feature h3`), and the `.tag` pills. Oswald
   at small sizes is hard to read — do not apply it to the game tiles.
4. **True black stays true black** (`--bg` #050505). Depth comes from the gold
   vignette + the panel surface tokens, not from a lighter canvas.
5. **Gold is the only global accent.** Per-game colors appear ONLY inside
   `.game-card` tiles via inline `--c`. Everywhere else use gold.
6. **Games = PlayStation tiles.** Present any list of games as `.game-card`s in a
   `.games-grid`, each with its `--c` accent and the hover lift+glow. Don't swap
   to a different list/layout pattern.
7. **Match the app's game roster.** The tiles mirror `AVAILABLE_GAMES` in the app
   repo (`Scoundrel/types/gallery.ts`): name, subtitle, description, and the
   tile's `--c` = that game's `color`. When a game is added/renamed there, update
   the gallery in `index.html`.
8. **Respect `prefers-reduced-motion`** (already handled in `styles.css`).

---

## Motion & Interaction

Tasteful, modern motion is part of the look. All of it is **progressive
enhancement** — the site is fully usable with JS off and honors
`prefers-reduced-motion`.

- **Aurora hero** — a drifting gold/violet glow behind the hero. Requires
  `<div class="aurora"></div>` as the first child of `.hero`. Pure CSS.
- **Film grain** — a faint fixed `body::after` noise overlay so true black isn't
  flat. Pure CSS.
- **Wordmark shimmer** — a gold light sweeps across the hero `h1` (background-clip
  text). Pure CSS, with an `@supports` fallback to solid text.
- **Cursor-spotlight game tiles** — `.game-card::after` is a radial glow in the
  game's own `--c` color that follows the cursor via `--mx/--my` (set by
  `script.js`). Falls back to a top-centered glow without JS.
- **Hover "bounce" on feature cards** — `.feature` cards lift + gain a gold edge
  on hover. CSS only. Keep the feature boxes **uniform size** (no bento /
  varied spans — this was a deliberate design decision).
- **Scroll reveal** — elements tagged `.reveal` fade + rise as they enter view
  (`script.js` adds `.in`, lightly staggered). Hidden state is gated behind
  `html.js` (set by a tiny inline script in `<head>`) so no-JS visitors always
  see content. Add `.reveal` to section headings, game tiles, feature cards, and
  screenshots on any new section.

**Rule:** keep motion subtle and on-theme. Don't add new effects beyond this set
without a reason — restraint is what keeps it looking professional.

## Files

| File | Role |
|---|---|
| `styles.css` | **The design system.** Tokens + components. Single source of truth. |
| `index.html` | Reference implementation: hero → game gallery → features → screenshots → CTA. |
| `privacy.html`, `support.html` | Doc pages — use the `.doc` styles. |
| `WEBSITE_THEME.md` | This spec — the rules. |

Deployed via **Cloudflare Pages** (Git-connected): every push to `main`
auto-deploys.
