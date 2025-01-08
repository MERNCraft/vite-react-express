<!-- A placeholder backend -->
<section
  id="placeholder-backend"
  aria-labelledby="placeholder-backend"
  data-item="Minimal Backend"
>
  <h2><a href="#placeholder-backend">A Placeholder file in `public/backend`</a></h2>

Your backend Express server is going to serve _static_ files from a directory called `public`. (You can call the directory anything you want, but `public` is the name that is used conventionally.) Later, you will create static React files using Vite, but it's best to start simply, with a proof-of-concept.

Inside `backend/public`, create a file called `index.html` with the content shown below. This is just a throwaway placeholder file, so you can just copy and paste it without any further thought. You will be creating something much more meaningful soon.

```html
<!DOCTYPE html>
<html lang="en">
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
      font-size: 16vw;
    }
  </style>
  <title>Placeholder</title>
</head>
<body>
  <h1>Placeholder</h1>
</body>
</html>
```

You can Double-Click on this file to open it in your favourite browser.

![A placeholder file in `backend/public`](images/placeholder.webp)

Now you can create the simplest Express server to serve up this placeholder page.
  

</section>