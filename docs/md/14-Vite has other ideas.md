<!-- Vite has other ideas -->
<section
  id="vite-has-other-ideas"
  aria-labelledby="vite-has-other-ideas"
  data-item="Vite Has Other Ideas"
>
  <h2><a href="#vite-has-other-ideas">Vite Has Other Ideas</a></h2>

When you are developing your app, you don't want to have to run `npm run publish` after every change. If you've worked with Vite before at all, you will have got used to the idea that Vite uses [hot reloading](https://dev.to/debajit13/the-magic-of-hot-reloading-in-react-5d48) to update the code in your browser each time you save a changed file. I'm guessing that you want to continue working that way in this project, too.

If you ran `npm run dev` to get Vite start your frontend development server, you should still be able to visit http://localhost:5173/, where you will see the same `GET /ping` button that was served from your Express server.

<details class="tip" open>
<summary>Restart the Vite development server if necessary</summary>
If necessary, open a Terminal window on your `frontend/` directory, and run `npm run dev`, then Ctrl- or Cmd- click on the link that is displayed.

</details>

1. Visit http://localhost:5173/
2. Click on the `GET /ping` button.

The results will be rather different from what you might expect:

![The result of GET /ping received by the frontend](images/viteping.webp)


## What is Vite sending you?

Not sanitizing the incoming string before setting the `innerHTML` of the element means that you can see exactly what string you receive.

Vite responds to a request for `/ping` with what seems to be an HTML page. The `<title>Vite + React</title>` tag might give you a clue as to what page this is. 

Open `frontend/index.html` and compare it to what you see in your browser. It's the same page with a couple of scripts injected by Vite. The scripts injected by Vite are highlighted below:

```html-
<i><!doctype html>
<html lang="en">
  <head>
    </i><b><script type="module">
import RefreshRuntime from "/@react-refresh"
RefreshRuntime.injectIntoGlobalHook(window)
window.$RefreshReg$ = () => {}
window.$RefreshSig$ = () => (type) => type
window.__vite_plugin_react_preamble_installed__ = true
</script>

    <script type="module" src="/@vite/client"></script></b><i>

    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx?t=1736244164711"></script>
  </body>
</html></i>
```


<details class="question" open>
<summary>What can you conclude from this?</summary>
Whenever you make a request to the Vite development server, it will respond with the `index.html` page, regardless of the path that you use. Here, it responded as if your request had been for the `/` path and not for `/ping`. The `ping` part of the path was ignored.

This is how the Vite development server works, and it works this way for a reason.

**Remember this, because you will be using this insight later.**

</details>

</section>
