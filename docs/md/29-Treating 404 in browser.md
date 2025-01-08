<!-- Treating 404 in browser -->
<section
  id="treating-404-in-browser"
  aria-labelledby="treating-404-in-browser"
  data-item="404 in the Browser"
>
  <h2><a href="#treating-404-in-browser">Treating 404 in the Browser</a></h2>
  
One final test: what happens if you enter a non-existent `path` in the browser address bar? Try it.

1. In the browser address bar, visit [http://localhost:3000/pingo](http://localhost:3000/pingo), or any other path that is not explicitly treated as a client-side route or API route.

![Elegantly handling an unknown route](images/pingo.webp)

All is well. The Page Not Found page is shown.

<details class="pivot" open>
<summary>Ready to Deploy</summary>
You now have a project built with a React frontend using Vite and an Express backend. You have ensured that its features work as expected in development mode and in a preview of production mode. You can visit different "pages" in the browser and fetch data from the backend.

Aesthetically, it's not going to fascinate your friends, family and colleagues, but technically, it's a solid achievement.

The next step will be to deploy this proof-of-concept project to a server on a hosting web site.

</details>

</section>