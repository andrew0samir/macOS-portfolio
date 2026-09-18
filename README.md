# macOS Portfolio

An interactive personal portfolio that mimics a macOS desktop: menu bar, dock, wallpaper, and draggable app windows. Content is organized as folders and files (projects, resume, photos, contact) instead of a traditional multi-page site.

Desktop and tablet layouts are the primary experience. Small screens currently show a notice that a mobile layout is still in progress.

## Screenshots

Images live in [`screenshots/`](screenshots/) at the repo root (not `public/`). GitHub renders them from these relative paths, so they show on the repository page and in README previews.

Drop PNG (or JPG/WebP) files using the names below. Until a file is committed, that image will be missing in the preview.

### Desktop

Landing view: wallpaper, menu bar, welcome type, dock, and project folders.

![Desktop overview](screenshots/01-desktop.png)

### Workflow

Open a project from the desktop (or the dock **Portfolio** icon), browse Finder, then open a file. Text, image, PDF, and URL items each open in the matching window (or a new tab).

![Finder — project folder](screenshots/02-finder.png)

![Text viewer from a project file](screenshots/03-text.png)

![Image viewer from a project file](screenshots/04-image.png)

### Apps

![Dock (Portfolio, Articles, Gallery, Contact, Skills, Archive)](screenshots/05-dock.png)

![Safari — articles](screenshots/06-safari.png)

![Photos — gallery](screenshots/07-photos.png)

![Terminal — tech stack](screenshots/08-terminal.png)

![Contact](screenshots/09-contact.png)

![Resume PDF](screenshots/10-resume.png)

![Trash — archive](screenshots/11-trash.png)

![Stacked windows (focus and z-index)](screenshots/12-windows-stacked.png)

**Filename map** (save captures as these exact names):

| File | Capture |
| --- | --- |
| `screenshots/01-desktop.png` | Full desktop, no extra windows |
| `screenshots/02-finder.png` | Finder open on a project |
| `screenshots/03-text.png` | `.txt` file in the Text window |
| `screenshots/04-image.png` | Image window from Finder or Gallery |
| `screenshots/05-dock.png` | Dock, ideally with hover magnification |
| `screenshots/06-safari.png` | Articles window |
| `screenshots/07-photos.png` | Gallery window |
| `screenshots/08-terminal.png` | Skills / tech stack |
| `screenshots/09-contact.png` | Contact window |
| `screenshots/10-resume.png` | Resume PDF window |
| `screenshots/11-trash.png` | Archive window |
| `screenshots/12-windows-stacked.png` | Several windows overlapping |

## Features

- **macOS chrome** — Menu bar with logo, nav links (Projects, Contact, Resume), status icons, and a live clock (`dayjs`).
- **Welcome hero** — Variable-font title/subtitle with GSAP hover that thickens nearby letters.
- **Dock** — macOS-style magnification on hover, tooltips, and click-to-toggle windows (Portfolio, Articles, Gallery, Contact, Skills, Archive).
- **Desktop folders** — Project folders on the wallpaper; click opens Finder at that project.
- **Window manager** — Open, close, focus, and drag windows. Focused windows get a higher z-index so they stack like real OS windows.
- **Finder (Portfolio)** — Sidebar of Favorites and projects; content pane lists files. Opening an item routes by type:
  - folders → navigate inside Finder
  - `.txt` → Text window
  - images → Image window
  - `.pdf` → Resume window
  - URLs / Figma files → new browser tab
- **Safari (Articles)** — Blog-style list with thumbnails and outbound links.
- **Photos (Gallery)** — Sidebar categories and a grid; clicking a photo opens the Image window.
- **Terminal (Skills)** — Tech stack grouped by category (Frontend, Mobile, Styling, Backend, Database, Dev Tools).
- **Contact** — Intro plus GitHub and LinkedIn.
- **Resume** — In-window PDF via `react-pdf`, with download.
- **Text / Image viewers** — Generic windows driven by payload data from Finder, Gallery, or Trash.
- **Trash (Archive)** — Archived images opened in the Image window.

## Project structure

```
macos-portfolio/
├── screenshots/            # README captures (GitHub preview); see filename map above
├── public/
│   ├── files/              # Resume PDF
│   ├── icons/              # Menu, Finder, social, gallery icons
│   └── images/             # Wallpaper, dock icons, project/gallery assets
├── src/
│   ├── App.jsx             # Shell: chrome + all window instances
│   ├── main.jsx            # React 19 entry
│   ├── index.css           # Tailwind v4 theme, wallpaper, window/dock styles
│   ├── components/         # Desktop chrome (not app windows)
│   │   ├── Navbar.jsx
│   │   ├── Welcome.jsx
│   │   ├── Dock.jsx
│   │   ├── Home.jsx        # Desktop project folders
│   │   ├── WindowControls.jsx
│   │   └── index.js        # Barrel exports
│   ├── windows/            # One component per “app”
│   │   ├── Finder.jsx
│   │   ├── Safari.jsx
│   │   ├── Photos.jsx
│   │   ├── Terminal.jsx
│   │   ├── Contact.jsx
│   │   ├── Resume.jsx
│   │   ├── Text.jsx
│   │   ├── Image.jsx
│   │   ├── Trash.jsx
│   │   └── index.js
│   ├── hoc/
│   │   └── WindowWrapper.jsx
│   ├── store/
│   │   ├── window.js       # Open / close / focus / z-index / payload
│   │   └── location.js     # Active Finder folder
│   └── constants/
│       └── index.js        # Nav, dock, blog, stack, socials, file tree, window config
├── vite.config.js          # React + Tailwind plugins, path aliases
├── jsconfig.json           # `@*` → `src/*` for the editor
└── package.json
```

Path aliases (Vite + `jsconfig`): `@components`, `@windows`, `@hoc`, `@store`, `@constants`.

## Work done

1. **Desktop shell** — Full-viewport wallpaper, menu bar, welcome copy, dock, and desktop folders.
2. **Window system** — Shared HOC for show/hide, open animation, GSAP drag, and stacking. Traffic-light controls close the target window.
3. **Global state** — Zustand + Immer for window map (`WINDOW_CONFIG`) and Finder navigation (`locations` tree).
4. **Content as a file system** — Nested folders/files for Work, About, Resume, and Trash. File types (`txt`, `img`, `pdf`, `url`, `fig`) decide how items open.
5. **App windows** — Finder, Safari/blog, Photos, Terminal/skills, Contact, Resume PDF, Text, Image, Trash/archive.
6. **Motion** — Dock magnification, window enter animation, draggable windows and folders, variable-font welcome hover.
7. **Styling** — Tailwind CSS v4 (`@tailwindcss/vite`), Georama + Roboto Mono, glass menu bar, app-specific layouts.
8. **Data-driven UI** — Copy, links, gallery, and project metadata live in `src/constants/index.js` so content can change without rewriting window components.

## Technologies

| Area | Stack |
| --- | --- |
| UI | React 19, Vite 8 |
| Styling | Tailwind CSS 4, `clsx` |
| State | Zustand 5, Immer |
| Animation / drag | GSAP 3, `@gsap/react`, GSAP `Draggable` |
| Icons | Lucide React |
| PDF | `react-pdf` (pdf.js worker) |
| Dates | `dayjs` |
| Tooltips | `react-tooltip` |
| Fonts | Georama (variable weight), Roboto Mono |
| Lint | ESLint 10, React Hooks / Refresh plugins |

## Patterns

### Higher-order component (HOC) — `WindowWrapper`

`WindowWrapper(Component, windowKey)` wraps each app window with:

- Subscription to `windows[windowKey]` (`isOpen`, `zIndex`)
- Open/close via `display`
- GSAP scale/fade enter animation
- GSAP `Draggable` on the window root
- Focus-on-press (`focusWindow`) so the dragged window comes to the front

Each window is exported as `WindowWrapper(Finder, "finder")` (and the same for safari, photos, terminal, contact, resume, txtfile, imgfile, trash). Window bodies stay focused on UI; chrome behavior is not duplicated.

### Window manager + payload

`useWindowStore` holds a keyed map (`finder`, `safari`, `txtfile`, …). `openWindow(key, data)` can pass a file object; Text and Image read `windows.txtfile.data` / `windows.imgfile.data`. That keeps one viewer instance per type instead of one window per file.

### Finder location store

`useLocationStore` tracks `activeLocation` in the nested `locations` tree (work / about / resume / trash and project folders). Sidebar clicks and desktop folders call `setActiveLocation`; Finder re-renders children of the current node.

### Barrel exports

`src/components/index.js` and `src/windows/index.js` re-export modules so `App.jsx` imports from `@components` and `@windows`.

### Config-driven UI

Dock apps, nav links, blog posts, tech stack, socials, gallery, and the file tree are constants. Components map over that data rather than hard-coding lists.

### Composition

Shared `WindowControls` (close / minimize / maximize chrome; close is wired). Windows compose header + body; Finder composes sidebar + content list.

### Path aliases

Vite `resolve.alias` plus `jsconfig` `paths` keep imports like `@hoc/WindowWrapper` and `@store/window` instead of long relative paths.

### Conditional file routing

Finder `openItem` is a small dispatcher: folder vs `pdf` vs `url`/`fig` vs generic `${fileType}${kind}` window keys (`txtfile`, `imgfile`).

## Getting started

```bash
npm install
npm run dev
```

| Script | Command |
| --- | --- |
| Dev server | `npm run dev` |
| Production build | `npm run build` |
| Preview build | `npm run preview` |
| Lint | `npm run lint` |

Open the app on a desktop or tablet viewport for the full windowed experience.
