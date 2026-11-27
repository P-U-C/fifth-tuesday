# Fifth Tuesday

**You become what you do every day.**

Fifth Tuesday is a product suite from P-U-C: three small apps for the parts of a life that need looking after.

- **Phase**: your body. iPhone, with Apple Health. In beta.
- **Field**: your head. Next.
- **Gain**: your money. Later.

The name comes from an idea we keep coming back to: what you do on the fifth Tuesday in a row of the same routine,
when nothing feels important and nobody is watching, is the truest measure of who you're becoming. Each day is a
small vote. These apps don't lecture; they show you what you really did, so you can become someone on purpose
rather than by default.

## This repo
The website, published with GitHub Pages: **https://p-u-c.github.io/fifth-tuesday/**

| Page | What's on it |
| --- | --- |
| [`/`](https://p-u-c.github.io/fifth-tuesday/) | The brand: your days are not neutral, every day is a vote (try a month), the fifth Tuesday |
| [`/products/`](https://p-u-c.github.io/fifth-tuesday/products/) | One screen: the line, a year of days as a calendar, then the three apps; then Phase, first |
| [`/phase/`](https://p-u-c.github.io/fifth-tuesday/phase/) | Phase: screens, what it does, your colour, intention |
| [`/support/`](https://p-u-c.github.io/fifth-tuesday/support/) | Questions and how to reach us |
| [`/privacy/`](https://p-u-c.github.io/fifth-tuesday/privacy/) | Phase's privacy policy |

Plain HTML, CSS and a little JavaScript; no build step. The whole site is set in Inter, from Google Fonts. The home page is black and white (`brand.css`); the products and app pages are dark (`style.css`). The colour picker (`colour.js`) is shared by the products and Phase pages, and remembers the pick between them.

The source lives in `site/` in the Phase app's repo and is published here with `scripts/site.sh` there, so edit it
there, not here. **27 Nov 2026:** the new home page, `products/`, `brand.css`, `colour.js`, `home/` and the link changes on the
other pages were made here directly; copy them into `site/` in the app repo before the next publish, or it will undo them. The colour picker on the Phase page recolours only the app's lilac in each screenshot, using a mask
per image (`phase/masks/`, made by `tools/site/lilac-mask.swift` in the app repo).

## Get in touch
Something broken or missing? [Open an issue](https://github.com/P-U-C/fifth-tuesday/issues). Please describe what
happened and don't paste health data.

© 2026 P-U-C
