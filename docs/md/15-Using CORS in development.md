<!-- Using CORS in development -->
<section
  id="using-cors-in-development"
  aria-labelledby="using-cors-in-development"
  data-item="CORS at Dev Time"
>
  <h2><a href="#using-cors-in-development">Using CORS In Development</a></h2>

It's easy to add a NodeJS package that will handle Cross-Origin Resource Sharing for you. The module is called `cors`.

1. Open a Terminal window that on your `backend/` directory
2. Run the command...
   ```bash-w
   npm i cors
   ```
   ... just like you did when you installed Express. This will download the `cors` package to your `node_modules` directory.
3. Open `backend/server.js`
4. Add the line of code highlighted in the listing below:

```js
<i>/**
 * server.js
 */

const express = require('express')
const router = require('./router')
const PORT = 3000

const server = express()
</i><b>server.use(require('cors')())</b><i>
server.use(express.static('public'));

server.use('/', router)

server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})</i>
```

With this new line your server is saying, in effect: "Anyone can make a request, and I'll answer and allow anyone to use my answer."

`nodemon` should restart your server automatically. Refresh your link to `http://localhost:5173`, and click on the `GET /ping` button again. You should see a successful result like in Figure 25 below.

Notice how the request comes `from http://localhost:5173` and is delivered `to   http://localhost:3000`.

![Successful /ping](images/gotPing.webp)

Notice how the value for `referer` is now set, because the request came from a script inside the page loaded from [http://localhost:5173/](http://localhost:5173/), and not from [http://localhost:3000/](http://localhost:3000/). In addition, the browser sent an `origin` header, because the `referer` does not have the same host as the server to which the request is being made.

Notice also that the `referer` ends with a `/` slash character, but the `origin` does not.

<details class="pivot" open>
<summary>CORS in production</summary>
CORS is not designed to protect servers. CORS is designed to protect browsers and end users.

The `cors` module does not tighten security. The `cors` module allows less secure connections under specific circumstances.

Next, you will be modifying the `server.js` script so that it does not use the `cors` module in production. As a result, it will use the tightest security. It will allow an end-user's browser to use data that it sends _only if_ the request for the data came from a script in a page loaded from your browser.

</details>
</section>