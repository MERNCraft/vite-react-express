<!-- Frontend pages from Express -->
<section
  id="frontend-pages-from-express"
  aria-labelledby="frontend-pages-from-express"
  data-item="Express for Frontend"
>
  <h2><a href="#frontend-pages-from-express">Frontend Pages From Express</a></h2>

It's time to see what breaks when the published React frontend is served from your Express backend.

1. In a Terminal that is active in the parent directory, run `npm run publish`
2. Visit the Express server at [http://localhost:3000](http://localhost:3000)
3. Click on the Link to [Page2](http://localhost:3000/page2)
4. Notice how, as before,  the contents of the page changes, and how the URL in the address updates to match the link that was clicked.
5. Use the link buttons to move back and forth between Page 1 and Page 2
6. Use the back ⬅️ and ➡️ forward buttons in the browser address bar

All this should work fine. Now to see where things break. All of the following will fail the same way:

8. Click in the browser address bar and press Enter to reload the page
9. Press the `Ctrl-R` shortcut to reload the current page
10. Type an unknown path like [http://localhost:3000/uncharted](http://localhost:3000/uncharted) into your browser's address bar.
11. Click on the link for `Ping` then click on the GET /ping button

![Many actions are `Not admitted` when the React site is served by Express](images/notAdmitted.webp)

</section>
