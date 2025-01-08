---
title: How to Serve a React Frontend with Express 
subtitle: Deploying frontend and backend as a single Web Service
month: January 2025
organization: MERNCraft
repo: Vite-React-Express
---

<!-- Introduction -->
<section
  id="Introduction"
  aria-labelledby="Introduction"
  data-item="Introduction"
>
  <h2><a href="#Introduction">Introduction</a></h2>

**Do you really need to host your frontend and your backend in two different places?**

When creating a web site using the MERN stack (MongoDB, Express, React and NodeJS), you might use:

* [Vite](https://vite.dev/) to develop your frontend
* [Express](https://expressjs.com/) to develop your backend
* A hosting site such as [Render.com](https://render.com/) to host your frontend and backend separately.

Having the frontend run from a different origin URL than the backend means that you will have to deal with [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) issues (Cross-Origin Resource Sharing).

**If you could use your Express backend to serve the files for your React frontend, then:**

1. **CORS issues disappear**
2. **You only have to deploy a single Web Service on your hosting site.**

## What happens when you build a Vite React site

When a site built with Vite is deployed, the `build` process actually reduces all your React code to three static files:

- index.html
- assets/index_s0m35tuff.js
- assets/index_m0reT3xt.css

The `build` process creates these in a folder called `dist/` and adds to this folder any additional files that you may have included in the `public/` folder that you used during development.

In other words, you can deploy your Vite React frontend as simply as you would for a site built by hand with HTML, CSS and JavaScript.

## Serving a static React site with Express

Your Express backend can [serve static files from a chosen folder](https://expressjs.com/en/starter/static-files.html). This means that you can use code as simple as...

```javascript-#
app.use(express.static('public'))
```

... to serve your Vite React frontend. All you have to do is:

- Run `npm run build` in your Vite React director
- Copy the files from the `dist/` folder into the `public/` folder in your backend directory
- Deploy your backend server.

This tutorial will show you how to set up your development environment to automate this process.

---



<details class="tip" open>
<summary>In this tutorial, you will be learning how to...</summary>
1. [Create a simple React frontend with Vite](#barebones-frontend)
2. [Use React-Router-DOM to create pages and internal links](#creating-pages-with-react-router-dom)
3. [Create a simple Express backend](#simple-express-server)
4. [Make API calls from your frontend to your backend](#accessing-the-api-from-the-frontend)
5. [Ensure that the backend works nicely with React-Router-DOM](#server-differences)
6. [Ensure that, in production, the backend is accessible only to the official frontend](#special-treatment-for-index-html)
7. [Create scripts to automate the deployment process](#writing-a-shell-script)
8. [Deploy your site to Render.com](#deploy-to-host)

Note that you won't be seeing this topics in this order.

</details>

<details class="note" open>
<summary>Prerequisites</summary>
Before you start you should already have:

- [A code editor, such as Microsoft's free Virtual Studio Code](https://code.visualstudio.com/)
- [Downloaded and installed Node.js and NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

You should already be familiar with:

- JavaScript
- Using [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) and the [`fetch API`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch),  to retrieve data from a server.
- Developing with [React](https://react.dev/)
- Basic bash commands in a Terminal window
- The most common `npm` commands

</details>

<details class="feedback" open>
<summary>You can help improve this tutorial</summary>
If you have any difficulties with this tutorial, or any suggestions on how to improve it, please [submit an issue on GitHub](https://github.com/MERNCraft/express-react/issues/new).

</details>

---

<details class="env" open>
<summary>Development Environment</summary>
I work on MacOS Sonoma, using [Microsoft's Visual Studio Code](https://code.visualstudio.com/) as my code editor and [Mozilla Firefox](https://www.mozilla.org/en-US/firefox/new/) as my default browser. If you are working on a different operating system, using a different IDE or browser, the screenshots may not match exactly what you see.

Any suggestions specific to VS Code will be shown in a field with a pale blue background like this.

</details>

</section>