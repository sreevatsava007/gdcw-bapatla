# Government Degree College for Women, Bapatla: Website

A static website (plain HTML, CSS and JavaScript) hosted on GitHub Pages.

## Folder layout

| Path | What it is |
|---|---|
| `index.html` | Home page with the scrolling "Latest" ticker, Notice Board and list of all circulars |
| `about.html` | History, vision and mission, principal's message, staff list |
| `gallery.html` | Photo gallery (click a photo to enlarge it) |
| `contact.html` | Address, phone, email, map |
| `data/circulars.js` | **The list of circulars. Edit this file to post updates.** |
| `circulars/` | PDF files of circulars |
| `assets/img/` | Header image and gallery photos |
| `assets/css/style.css` | All styling (colours are at the top) |
| `assets/js/main.js` | Ticker, notice board, mobile menu, gallery viewer |

## Posting a new circular

1. Copy the PDF (if there is one) into the `circulars/` folder. Use a simple file name without spaces, e.g. `exam-fee-nov-2026.pdf`.
2. Open `data/circulars.js` and add a line inside the `[ ]`:
   ```js
   { date: "2026-11-25", title: "Examination fee last date extended", link: "circulars/exam-fee-nov-2026.pdf" },
   ```
   Use `link: ""` if there is no file.
3. Commit and push. GitHub Pages updates the site within a minute or two.

The newest circulars are shown first automatically. Anything from the last 15 days gets a **NEW** badge.

> The circulars currently in `data/circulars.js` are **samples**. Replace them before sharing the site.

## Filling in college details

Search the project for `TODO` to find every spot that needs real information: phone, email, full address, principal's name, photo and message, staff list, student and faculty counts, and gallery photos.

## Previewing on your computer

Double-click `index.html`, or run a local server:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Publishing on GitHub Pages

1. Create a new repository on GitHub (e.g. `gdcw-bapatla`).
2. In this folder:
   ```bash
   git init
   git add .
   git commit -m "Initial college website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/gdcw-bapatla.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main`, folder `/ (root)` → Save**.
4. After a minute the site is live at `https://<your-username>.github.io/gdcw-bapatla/`.
# gdcw-bapatla
