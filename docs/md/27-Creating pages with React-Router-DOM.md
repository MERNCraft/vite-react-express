<!-- Creating pages with React Router DOM -->
<section
  id="creating-pages-with-react-router-dom"
  aria-labelledby="creating-pages-with-react-router-dom"
  data-item="A Multiple Page App"
>
  <h2><a href="#creating-pages-with-react-router-dom">Creating a Multiple Page App With React Router DOM</a></h2>

React gives you powerful tools to build a frontend from custom JavaScript, all contained in a single HTML page. This _single page app_ can remember the results of all the clicks and edits and interactions of the end-user, and store them locally as _state_ or _context_.

A React app can also pretend to navigate to other URLs, without actually changing the page. This is known as _routing_ .

With routing, a React app can:

* Update its display, depending on the URL that the end-user types in the address bar
* Update the URL in the address bar as the end-user visits different parts of the app.
* Provide links between the different sections of the app, that make it appear to navigate to a different page.
  
Copying the URL that is currently displayed and pasting it as the address in a new browser tab should display the app in exactly the same state in both tabs.

## Working with React-Router-DOM

In this part, I'll show you how the Vite development server and the [`react-router-dom`](https://reactrouter.com/home) NodeJS package work together to create this simulation of multiple pages. And you'll see that your Express backend works in a different way by default, but you can teach it to work in same way, with only a small tweak.

In development mode, you'll create a second "page" for your single page app, and use either links or direct typing in the browser's address bar to move between the two pages. You'll also see what happens if you type in a path that your single page app does not recognize. 

And then you'll test this in "production" mode using your Express backend, and work out how to tweak your backend so that it gives you the same behaviour.

<details class="warn" open>
<summary>No in-depth explanations of React-Router-DOM</summary>
In this tutorial, I will not explain how `react-router-dom` works or how to use it to good advantage in your own projects. I will assume that you already know about this from other sources.

My purpose here is simply to give you enough information to get your Express backend to work with `react-router-dom` the same way that the Vite development server works.

</details>
</section>