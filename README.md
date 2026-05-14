# LIU DINGYU PORTFOLIO

React + Vite + Tailwind CSS portfolio website for interior and landscape design works.

## Install

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Then open the local URL shown in the terminal, usually `http://localhost:5173`.

## Build

```bash
npm run build
```

## Replace Images

Put real project images in:

```text
public/images/
```

Keep the same filenames already referenced in `src/data/projects.js`, or update the paths in each project's `coverImage` and `images` fields.

## Add A Project

Open `src/data/projects.js`, copy an existing project object in the `projects` array, then edit:

- `id`
- `title`
- `englishTitle`
- `category`
- `type`
- `year`
- `location`
- `scope`
- `keywords`
- `coverImage`
- `images`
- `summary`
- `description`
- `background`
- `analysis`
- `concept`
- `highlights`

Use `category: "interior"` for the interior page and `category: "landscape"` for the landscape page.
