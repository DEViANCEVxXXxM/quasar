# Quasar

Independent interactive visualization with DEVIANCE / ATELIER Solo UI.

## Try it

Open on [GitHub Pages](https://deviancevxxxxm.github.io/quasar/)

## Run locally

For best compatibility (especially ES modules/import maps), serve this directory over HTTP:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000/`. Static GitHub Pages deployment also works.

## Structure

- `index.html` — original Quasar scene logic, shaders and page markup
- `assets/atelier-ui.css` — shared reusable UI design system (local copy)
- `assets/atelier-ui.js` — independent, scene-agnostic UI enhancement (local copy)

## Design

Accent: `#38bdf8` · Relativistic black hole simulation.

This repository is fully separate from the other demonstrations: no scene picker or outgoing project-to-project navigation. The original simulation code is unchanged. Original third-party CDN imports, where present, still require internet access.
