<!-- Conclusion -->
<section
  id="conclusion"
  aria-labelledby="conclusion"
  data-item="Conclusion"
>
  <h2><a href="#conclusion">Conclusion</a></h2>

The focus of this tutorial was to show you how to serve a React frontend created with Vite through an Express backend, and ensure that it would work safely when deployed to production.

The project in its current state is no more than a proof-of-concept. All the work of building a useful site on these foundations is yet to come.

You've explored the following techniques:

* How to set up your Vite React frontend and your Express backend in sister directories in the same parent directory
* How to create a `package.json` file with a `"scripts"` block in the parent directory, so you can manage both frontend and backend from the Terminal windows open on the same directory
* How to set up `npm` scripts along with a `shell` script to build your Vite app automatically and copy the files across to the `backend/public`
* How to get the backend Express server to serve the built React files using `express.static()`
* How to get the backend Express server to respond to an API request from the frontend
* How to set up CORS to loosen security ... in development mode only
* How to set up a JWT token and a cookie to limit access to the backend API in production mode
* How to ensure that the backend can run in production mode on any port
* How to manage client-side pages created using `react-router-dom`
* How to deploy your project as a web service on Render.com

But the medium is the message, so what else have you been learning?

- How to make incremental changes and test after every change
- When to use placeholders as scaffolding
- How to split your code into self-contained modules
- When to consult the documentation to master a new concept
- How to check your understanding by rewriting code from first principles
- How to learn how to learn from error messages
- How to identify potential problems in advance, and solve them at the appropriate time
- How to troubleshoot when results do not match assumptions
- How to manage the differences between dev and prod environments
- How to make your development environment compatible with the production environment
- How to automate your workflow

Now you can use this project as a starting point for more ambitious projects of your own.

</section>