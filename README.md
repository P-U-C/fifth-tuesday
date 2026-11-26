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
| [`/`](https://p-u-c.github.io/fifth-tuesday/) | One screen: the line, a field of days, then the three apps |
| [`/phase/`](https://p-u-c.github.io/fifth-tuesday/phase/) | Phase: screens, what it does, your colour, intention |
| [`/support/`](https://p-u-c.github.io/fifth-tuesday/support/) | Questions and how to reach us |
| [`/privacy/`](https://p-u-c.github.io/fifth-tuesday/privacy/) | Phase's privacy policy |

Plain HTML, CSS and a little JavaScript; no build step. Inter from Google Fonts.

The source lives in `site/` in the Phase app's repo and is published here with `scripts/site.sh` there, so edit it
there, not here. The colour picker on the Phase page recolours only the app's lilac in each screenshot, using a mask
per image (`phase/masks/`, made by `tools/site/lilac-mask.swift` in the app repo).

## Get in touch
Something broken or missing? [Open an issue](https://github.com/P-U-C/fifth-tuesday/issues). Please describe what
happened and don't paste health data.

© 2026 P-U-C
