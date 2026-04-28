# Last Hope Bar & Cafe — Landing Page

> Underground bar & cafe in Quy Nhơn, Vietnam.
> Built with **Vite + Vanilla JS** — no framework, no backend, pure static site.

---

## Project Structure

```
last-hope/
├── index.html              # Main HTML (SEO, schema.org, structure)
├── vite.config.js          # Vite config
├── package.json
├── .env.example            # Environment variable template
├── .gitignore
│
├── public/
│   └── photos/             # ← PUT YOUR PHOTOS HERE (jpg/webp)
│       ├── interior-1.jpg
│       ├── neon.jpg
│       ├── bar.jpg
│       ├── wall.jpg
│       ├── outside.jpg
│       ├── crowd.jpg
│       ├── music.jpg
│       └── night.jpg
│
└── src/
    ├── css/
    │   └── main.css        # All styles (mobile-first, CSS variables)
    ├── js/
    │   ├── main.js         # Entry point — wires all modules
    │   ├── data.js         # ← EDIT THIS to update drinks/events/reviews
    │   ├── nav.js          # Navigation, burger menu, active links
    │   ├── render.js       # Injects dynamic content into DOM
    │   ├── fab.js          # Floating action button (Maps/IG/TG/Zalo)
    │   └── animations.js   # Scroll reveal, hero glitch, parallax
    └── assets/
        └── photo-placeholder.svg
```

---

## Requirements

- **Node.js** v18 or higher — [nodejs.org](https://nodejs.org)
- **npm** v9+ (comes with Node)

No Python, no backend, no database. Pure static HTML/CSS/JS.

---

## Quick Start

### 1. Install dependencies

```bash
cd last-hope
npm install
```

### 2. Set up environment (optional)

```bash
cp .env.example .env
# Edit .env with your values if needed
```

### 3. Start dev server

```bash
npm run dev
```

Opens at **http://localhost:3000** with hot reload.

---

## Customization

### Update content (drinks, events, reviews)

Edit **`src/js/data.js`** — it's the single source of truth for all text content.

```js
// Example: add a new drink
export const drinks = [
  {
    category: 'Signature',
    name: 'Your Drink Name',
    desc: 'Ingredient 1 · Ingredient 2 · Ingredient 3',
    price: '120,000 ₫',
  },
  // ...
]
```

### Add real photos

Drop your photos into **`public/photos/`**:
```
public/photos/interior-1.jpg   (main interior shot — displays largest)
public/photos/neon.jpg
public/photos/bar.jpg
public/photos/wall.jpg
public/photos/outside.jpg
public/photos/crowd.jpg
public/photos/music.jpg
public/photos/night.jpg
```

Photos are automatically displayed in the gallery mosaic.
**Recommended:** JPEG or WebP, minimum 800px wide, 16:9 or 4:3 ratio.
They are rendered in grayscale by default (filter: grayscale) for the aesthetic — remove in CSS if you want color.

### Update contact info

In `index.html`, search for and replace:
- `Your Street Address` → real address
- `+84 256 xxx xxxx` → real phone number
- `lasthopebar.vn` → real domain
- Telegram link `https://t.me/lasthopebar` → real Telegram
- Zalo link `https://zalo.me/0256xxxxxxx` → real Zalo number
- Google Maps link → real Maps URL

### Update Schema.org SEO data

In `index.html` in the `<script type="application/ld+json">` block:
- `streetAddress` — real address
- `latitude` / `longitude` — real coordinates
- `telephone` — real number

---

## Build for Production

```bash
npm run build
```

Output goes to `dist/` — upload this folder to your hosting.

```bash
# Preview the production build locally
npm run preview
```

---

## Deployment Options

| Platform | How |
|---|---|
| **Netlify** | Drag & drop `dist/` folder, or connect GitHub repo with `npm run build` |
| **Vercel** | `vercel --prod` from project root |
| **VPS/cPanel** | Upload `dist/` contents to `public_html/` |
| **GitHub Pages** | Push `dist/` to `gh-pages` branch |

---

## SEO Checklist (do these after launch)

- [ ] Replace `og-image.jpg` in `/public/` — 1200×630px photo of the bar
- [ ] Register **Google Business Profile** at business.google.com (most important!)
- [ ] Submit to **TripAdvisor**, **Foody.vn**
- [ ] Add real coordinates to Schema.org in `index.html`
- [ ] Set up **Google Search Console** and submit sitemap
- [ ] Add **Google Analytics** or Plausible if you want traffic data

---

## Customizing Links (FAB button)

In `index.html`, find the `<!-- FLOATING CONTACT -->` section and update `href` values:

```html
<!-- Instagram -->
<a href="https://instagram.com/YOUR_HANDLE" ...>

<!-- Telegram -->
<a href="https://t.me/YOUR_CHANNEL" ...>

<!-- Zalo -->
<a href="https://zalo.me/YOUR_NUMBER" ...>

<!-- Google Maps -->
<a href="https://maps.google.com/?q=YOUR+BAR+NAME" ...>
```

---

## Tech Stack

| Part | Tech |
|---|---|
| Build tool | [Vite 5](https://vitejs.dev) |
| Language | Vanilla JavaScript (ES modules) |
| Styling | CSS custom properties, no framework |
| Fonts | Bebas Neue · Space Mono · Special Elite (Google Fonts) |
| Animations | CSS + IntersectionObserver API |
| SEO | Schema.org BarOrPub · Open Graph · hreflang · geo meta |
| Hosting | Any static host (Netlify, Vercel, VPS) |

---

Made for **Last Hope Bar & Cafe** · Quy Nhơn, Bình Định, Vietnam
