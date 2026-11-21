# Publishing the College Website on GitHub Pages

This guide shows how to put the website online for free with GitHub Pages and how to update it later.

When you're done, the site will be live at:

```
https://<your-username>.github.io/<repository-name>/
```

For example: `https://gdcwbapatla.github.io/gdcw-bapatla/`

---

## Step 1: Create a GitHub account (skip if you have one)

1. Go to <https://github.com/signup>.
2. Enter an email address, a password and a username.
   - The username becomes part of the website address, so pick something short and official-looking (e.g. `gdcwbapatla`).
3. Verify your email address.

---

## Step 2: Create a repository

1. Log in to GitHub and click **+** (top right), then **New repository**.
2. Fill in the form:
   - **Repository name:** `gdcw-bapatla` (or any name; lowercase with hyphens, no spaces)
   - **Description:** `Website of Government Degree College for Women, Bapatla`
   - **Visibility:** **Public**. GitHub Pages is only free for public repositories.
   - Leave **"Add a README file"** unticked. The project already has one.
3. Click **Create repository**.

---

## Step 3: Upload the website files

Choose **one** of the two methods below.

### Method A: Upload through the browser (easiest, no software needed)

1. On the new, empty repository page, click the **"uploading an existing file"** link.
2. Open the `bapatla website` folder in your file manager.
3. Select **these items** and drag them into the browser window:
   ```
   index.html
   about.html
   gallery.html
   contact.html
   README.md
   github.md
   .nojekyll
   assets      (folder)
   data        (folder)
   circulars   (folder)
   ```
   - **Don't upload** `WhatsApp Image 2026-11-21 at 8.45.41 AM.jpeg`. The site uses the copy in `assets/img/header.jpg`.
   - `.nojekyll` is a hidden file. In the Linux file manager, press **Ctrl + H** to show hidden files.
   - Make sure the folders keep their structure. After uploading you should see `assets/css/style.css`, `assets/js/main.js` and so on, not loose files.
4. Scroll down, type a message such as `Initial website`, and click **Commit changes**.

> **Tip:** Some browsers don't upload empty folders or hidden files when you drag them in. If `.nojekyll` is missing after uploading, click **Add file → Create new file**, name it `.nojekyll`, leave it empty, and click **Commit changes**.

### Method B: Upload with Git from the terminal

1. Install Git (once):
   ```bash
   sudo apt install git
   git config --global user.name "Your Name"
   git config --global user.email "you@example.com"
   ```
2. Open a terminal in the project folder:
   ```bash
   cd "/home/prasad/Desktop/bapatla website"
   ```
3. Stop the original WhatsApp image from being uploaded:
   ```bash
   echo "WhatsApp Image*.jpeg" > .gitignore
   ```
4. Create the first commit and push it (replace `<your-username>`):
   ```bash
   git init
   git add .
   git commit -m "Initial website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/gdcw-bapatla.git
   git push -u origin main
   ```
5. When asked for a password, GitHub needs a **Personal Access Token**, not your account password:
   - GitHub → profile picture → **Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token**
   - Tick the **repo** scope, generate the token, and copy it.
   - Paste the token when the terminal asks for the password. It won't show on screen while you paste.

---

## Step 4: Turn on GitHub Pages

1. In the repository, click **Settings** (top menu).
2. In the left sidebar, click **Pages**.
3. Under **Build and deployment**:
   - **Source:** `Deploy from a branch`
   - **Branch:** `main`, folder `/ (root)`
   - Click **Save**.
4. Wait 1–2 minutes and refresh the page. A box appears at the top:
   > Your site is live at `https://<your-username>.github.io/gdcw-bapatla/`
5. Open the link and check that:
   - the header photo shows
   - the **LATEST** strip and the **Notice Board** are scrolling
   - the About, Gallery and Contact pages open
   - the map on the Contact page points to the college

---

## Step 5: Updating the site later

Every change you upload goes live within 1–2 minutes.

### Posting a new circular (browser method)

1. If the circular has a PDF, open the `circulars` folder in the repository, click **Add file → Upload files**, upload the PDF (a short name without spaces, e.g. `exam-fee-nov-2026.pdf`), and click **Commit changes**.
2. Open `data/circulars.js` in the repository and click the **pencil icon (Edit)**.
3. Add a new line inside the `[ ]`, for example:
   ```js
   { date: "2026-11-25", title: "Examination fee last date extended", link: "circulars/exam-fee-nov-2026.pdf" },
   ```
   - Date format is `YYYY-MM-DD`.
   - Use `link: ""` if there is no PDF.
   - Keep the quotes, the curly brackets and the comma at the end.
4. Click **Commit changes**.

### Posting a new circular (Git method)

Edit the files on your computer, then run:
```bash
cd "/home/prasad/Desktop/bapatla website"
git add .
git commit -m "Add circular: exam fee last date"
git push
```

### Changing other content

- **Phone, email, address, principal, staff:** edit `about.html`, `contact.html` and the footer in every page. Search for `TODO`.
- **Gallery photos:** upload photos to `assets/img/gallery/`, then edit `gallery.html` (instructions are inside that file).
- **Principal's photo:** upload it as `assets/img/principal.jpg` and follow the note in `about.html`.

---

## Before sharing the link

- [ ] Replace the **SAMPLE** circulars in `data/circulars.js` with real ones.
- [ ] Fill in phone, email and full address (Contact page and the footer of all 4 pages).
- [ ] Add the principal's name, photo and message (About page).
- [ ] Fill in the staff list (About page).
- [ ] Update the Students and Faculty numbers on the Home page.
- [ ] Add real gallery photos.
- [ ] Check that the map on the Contact page shows the correct building.

---

## Optional: Use your own domain name

If the college buys a domain such as `gdcwbapatla.ac.in` or `gdcwbapatla.in`:

1. In the repository, go to **Settings → Pages → Custom domain**, enter the domain, and click **Save**. This creates a `CNAME` file automatically.
2. At the domain provider, add these DNS records:
   - Four **A** records for `@` pointing to:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - A **CNAME** record for `www` pointing to `<your-username>.github.io`
3. Once the DNS check passes (this can take up to 24 hours), tick **Enforce HTTPS**.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| **404 "There isn't a GitHub Pages site here"** | Wait 2–3 minutes after enabling Pages. Check **Settings → Pages** shows branch `main` and `/ (root)`. Make sure `index.html` is at the top level of the repository, not inside a sub-folder. |
| **Page shows but has no colours or styling** | The `assets` folder wasn't uploaded with its structure. The repository must contain `assets/css/style.css`. |
| **Header photo missing** | Check that `assets/img/header.jpg` exists in the repository. File names are case-sensitive (`header.jpg` ≠ `Header.JPG`). |
| **Ticker or Notice Board is empty** | There's a typo in `data/circulars.js`, often a missing comma or quote. Compare your line with the examples in the file. |
| **Changes not showing** | Wait 2 minutes, then hard-refresh with **Ctrl + Shift + R**. Check the **Actions** tab in the repository; a green tick means the update was published. |
| **A PDF link opens a 404** | The `link` in `circulars.js` must match the PDF file name exactly, including capital letters, e.g. `circulars/exam-fee-nov-2026.pdf`. |
