<!-- Using frontend files -->
<section
  id="using-frontend-files"
  aria-labelledby="using-frontend-files"
  data-item="Using Frontend Files"
>
  <h2><a href="#using-frontend-files">Using Files from the Frontend</a></h2>

Soon, you'll be using Vite to create a React frontend, but for now, you can do a simple simulation of what needs to happen when you develop the frontend in its own directory.

Here's how you can copy the `index.html` file from the `backend/public/` directory into the `frontend/dist/` directory. You can do this by:

1. Open a new Terminal window in the parent directory for your project
2. Run:
   
```bash-w
cp backend/public/index.html frontend/dist/
```
  
This means: <b>c</b>o<b>p</b>y the `index.html` file that is inside the `backend/public/` folder (relative to this parent folder), into the `frontend/dist/` older.

The `dist/` directory is the folder that Vite will use when it `build`s  the deployment version of your React frontend.

3. Open the file that has been created at `frontend/dist/index.html`
4. Make some changes in this copy of the file. For instance:
	- Change the color of the `<h1>` text to a deep red
	- Use `Frontend` instead of `Placeholder` for the `<title>` an the `<h1>` text itself
  
```html
<i><!DOCTYPE html>
<head>
  <meta charset="UTF-8">
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  >
  <style>
    body {
      margin: 0;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #222;
      color: #ddd
    }

    h1 {
      font-size: 16vw;</i>
      <b>color: #900;</b>

    }
  </style>
  <title></i><b>Placeholder</b><i></title>
</head>
<body>
  <h1></i><b>Placeholder</b></i></h1>
</body></i>
```

You can open this new `index.html` file direcly in your browser, to be sure that it looks different from the previous Placeholder page.

![The frontend is different from the backend](images/frontholder.webp)

Now you can write a couple of scripts to make the Express server deliver this page instead of the Placeholder page it served up before.
</section>