# CampusConnect — Prototype

A clickable prototype of the CampusConnect MVP, built from the product requirements doc. No backend, no build step — it's plain HTML/CSS/JS, so it runs anywhere, including directly from GitHub Pages.

**Covers:** Home feed · Discover (people matching) · Events · Opportunities · Projects (teammate matching) · Communities · Profile.

All data in `js/data.js` is sample data for the demo — buttons like "Connect," "Register," and "Request to join" update the on-screen state so you can show a live interaction, but nothing is saved to a server.

## Run it locally

No install needed. Either:
- Double-click `index.html` to open it in a browser, or
- From this folder, run a tiny local server so relative paths behave the same as they will on the web:
  ```
  python3 -m http.server 8000
  ```
  then open `http://localhost:8000`.

## Put it on GitHub (so you have a URL to share)

1. **Create a new repository** on GitHub (github.com → New repository). Name it something like `campusconnect`. Don't add a README or .gitignore there — you already have one.

2. **From this folder**, run:
   ```
   git init
   git add .
   git commit -m "Initial CampusConnect prototype"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/campusconnect.git
   git push -u origin main
   ```
   Replace `YOUR-USERNAME` with your GitHub username. This gives you the git URL to share:
   `https://github.com/YOUR-USERNAME/campusconnect`

3. **Turn on GitHub Pages** so faculty can open a live link (not just browse code):
   - On the repo page, go to **Settings → Pages**.
   - Under "Build and deployment," set **Source** to `Deploy from a branch`.
   - Set **Branch** to `main` and folder to `/ (root)`, then **Save**.
   - After a minute, GitHub shows a live URL like:
     `https://YOUR-USERNAME.github.io/campusconnect/`
   - That's the link you can send your faculty — it opens the working prototype directly, no download needed.

## Project structure

```
campusconnect/
├── index.html        # App shell + navigation
├── css/style.css      # All styling (design tokens at the top)
├── js/data.js         # Sample data (people, events, opportunities, projects, communities)
├── js/app.js          # View rendering + interactions
└── README.md
```

## Extending it

- To change sample content, edit `js/data.js` — every view reads from there.
- To add a new section, add a `view____()` function in `app.js`, register it in the `VIEWS` object, and add a nav button in `index.html`.
- When you're ready for a real backend, the PRD's MVP list (auth, profiles, feed, discovery, connections, communities, events, opportunities, projects, messaging, notifications, admin dashboard) is the right build order — this prototype covers the parts a faculty demo needs to see first.
