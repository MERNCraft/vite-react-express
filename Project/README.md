# Vite-React-Express #

A proof-of-concept of a Vite React site served by an Express Backend.

## File hierarchy

This project directory includes:
```
├── THIS `README.md` file
│
├── index.html
│   └── tutorial
│       ├── images/
│       ├── styles.css
│       ├── media-queries.css
│       ├── script.js
│       ├── storage.js
│       └──  prism/
│
├── backend
│   │   
│   ├── .env               (placeholder values)
│   ├── .gitignore
│   │
│   ├── node_modules/      (will be created when you run `npm i`)
│   │
│   ├── controllers
│   │   ├── index.js
│   │   └── ping.js
│   │
│   ├── middleware
│   │   ├── index.js
│   │   ├── jwToken.js
│   │   └── serveCookie.js
│   │
│   ├── public             (populated by `npm run publish`)
│   │   ├── assets
│   │   │   ├── index-CqwqLku9.js
│   │   │   └── index-DJaG3xuZ.css
│   │   ├── index.html
│   │   └── vite.svg
│   │
│   ├── router.js
│   ├── server.js
│   │
│   ├── package-lock.json
│   └── package.json
│
├── frontend
│   ├── .env
│   ├── LICENSE
│   ├── README.md
│   ├── dist/              (contents copied to backend/public)
│   ├── eslint.config.js
│   ├── index.html
│   ├── node_modules/      (will be created when you run `npm i`)
│   ├── package-lock.json
│   ├── package.json
│   ├── public/
│   ├── src/
│   └── vite.config.js
│
├── package.json
└── publish.sh
```

---
## Git Repositories

For convenience, this entire project is bundled into a single Git repository that is easy to clone from GitHub. However, while you are developing, it would make sense to create separate Git repositories for the frontend and for the backend.

To make this easy, you can **open a Terminal window in the parent directory and run:**

`npm run split-git`

This will remove the Git repository from the parent director and set up fresh new repositories in both the `backend/` and `frontend/` directories.

> ***Note**: the various `npm run ...` commands that are mentioned here are custom scripts that you will find inside the `package.json` file.*

Your new repositories will not be connected to GitHub, so you should **create a separate GitHub repository for each of them, and use...**

```git
git remote add origin git@github.com:<account>/<repo-name>.git
git push -u origin main
```
... (using your actual account and repository name) to push your new local repositories to GitHub.


---
## Tutorial

To read the tutorial, open `index.html` in your browser.

***Note** that the folder structure used in the tutorial is flatter than the one used here, but the code is essentially the same.*

---
## Installing the `node_modules`

Before you can start, the `npm install` command needs to be run twice, once for the `backend/` directory, once for the `frontend/` directory. To make this simpler for you, you can **open a Terminal window in the parent directory and run:**

`npm run setup`

This will run `npm install` for you in both places.

---
## Running the Express backend

To launch the Express backend, **open a Terminal in either the parent folder or the `backend/` folder and run:**

`npm start`

You should see something like:

```bash-#
[nodemon] starting `node server.js`
🤚USING CORS FOR DEVELOPMENT
Server listening at http://localhost:3000
```

**Ctrl- (or Cmd-) Click on the URL to see it in your browser.**

---
## Developing with the frontend

To make changes to the frontend and see them update live in your browser, **open a Terminal in either the parent folder or the `frontend/` folder and run:**

`npm run dev`

You should see something like:

```bash-#
 VITE v6.0.1  ready in 98 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

**Ctrl- (or Cmd-) Click on the URL to see it in your browser.**

The Vite development server will launch its own frontend, which will connect to the Express backend when it makes API requests. The Express backend allows CORS requests from any source during development, and logs the CORS exceptions that it makes for the frontend.

---
## Publish and Test in Production Mode

When your project is working the way you want it, both in the frontend and the backend, you can preview it in production mode.

**Open a Terminal in _the parent folder_ (only) and run:**

`npm run publish`

This will get Vite to `build` your frontend project and sync all its static files with the `backend/public/` directory.

**In `backend/.env` set `NODE_ENV=production`**  
**Stop the backend server and relaunch it**

In production mode, the backend will ignore all API requests from the development frontend. If you need to make further changes to the frontend, reset `NODE_ENV=dev` in `backend/.env`.

---
## Deployment

You will need to create a separate Git repository for the backend, and push that to GitHub. If you ran `npm run split-git` at the beginning, and created separate GitHub repositories, then you should be all set.

---
## Tutorial

To read the tutorial, open `index.html` in your browser.
