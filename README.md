# The Rogue's Gallery — Marketing Site

Static marketing site for **The Rogue's Gallery** (iOS), by Underground
Development. Plain HTML/CSS — no build step. Hosted on Cloudflare Pages with
Git integration: every push to `main` auto-deploys.

> **Theme:** the site uses a fixed design system — "Lamborghini" (true-black +
> gold, dramatic uppercase type) + "PlayStation" gallery layout. The single
> source of truth is [`styles.css`](styles.css) (tokens + components) and
> [`WEBSITE_THEME.md`](WEBSITE_THEME.md) (the rules). Any change to the site must
> follow it — link `styles.css`, reuse its classes, and never hardcode
> colors/fonts in a page. Read `WEBSITE_THEME.md` before editing.

## Structure

```
index.html      home page (hero, game collection, features, CTA)
privacy.html    privacy policy (required by the App Store)
support.html    support page (required by the App Store)
styles.css      all styles
assets/         app icon, favicon, and game icons
```

## Local preview

Just open `index.html` in a browser, or serve the folder:

```sh
npx serve .
```

## Deploy (Cloudflare Pages, Git-connected)

1. Push this repo to GitHub.
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to
   Git**, pick this repo.
3. Build settings: **Framework preset: None**, **Build command: (leave blank)**,
   **Build output directory: `/`**. (It's a static site — nothing to build.)
4. Deploy. Then **Custom domains → Set up a domain** and add your domain; since
   Cloudflare manages the DNS, it's one click.

After that, every `git push` to `main` redeploys automatically.

## To do before launch

- Swap the three placeholder screenshots in `index.html` (`.shot-ph`) for real
  App Store screenshots (drop images in `assets/` and replace the placeholder
  divs with `<img>` tags).
- Optionally replace the styled App Store button with Apple's official
  "Download on the App Store" badge per Apple's marketing guidelines.
- Consider a support email on the domain (e.g. support@yourdomain) via
  Cloudflare Email Routing, forwarding to your inbox.
