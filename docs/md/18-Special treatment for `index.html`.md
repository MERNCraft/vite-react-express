<!-- Special treatment for `index.html` -->
<section
  id="special-treatment-for-index-html"
  aria-labelledby="special-treatment-for-index-html"
  data-item="Treating index.html"
>
  <h2><a href="#special-treatment-for-index-html">Special Treatment For `index.html`</a></h2>

You want your backend Express server to detect when a request is made to one of its API routes, and to honour the request only if it came throug official channels.

If your server were a hotel, it would want to let clients into their rooms only if they first visited reception, and received a room key. You wouldn't want people to walk in uninvited, go directly to a room, and move in.

In other words, you need to make a client's first interaction with your server to be a visit to some kind of reception desk.

In server-speak, when someone asks the server for the `index.html` , the server needs to:

* Create a token (a key for the room)
* Wrap the token in a cookie (attach it to an official hotel key ring)
* Respond to the requests with both the content of `index.html` and the cookie (give the key and the key ring to the client who requested access).

The server uses `express.static('public')` to serve the `index.html` page. If the server finds the requested `path` inside the `public/` folder, it will send the page and stop there. It won't do any more processing after it has sent a response.

This means that you will have to get the server to create the cookie before it looks for anything in the `public/` folder.

OK. So "kitchen" might be a better metaphor than "reception desk", since we're talking about cookies.

## Preparing the kitchen

1. Create a new file at `backend/serveCookie.js`, but leave it empty for now.
2. Add a couple of new lines to the `server.js` file. Be warned: this will break the server, because it will look for data from `serveCookie.js`,  and I just now told you to leave it empty.

```js
<i>/**
 * server.js
 */

require('dotenv').config()
			
const PROD_REGEX = /^(production|prod|staging|release|deploy)$/i
const is_dev = !PROD_REGEX.test(process.env.NODE_ENV)
process.env.IS_DEV = is_dev

const express = require('express')
</i><b>const serveCookie = require('./serveCookie')</b><i>
const router = require('./router')
const PORT = process.env.PORT || 3000

const server = express()
if (is_dev) {
  // Accept all requests... but only in dev mode
  console.log("🤚USING CORS FOR DEVELOPMENT")
  server.use(require('cors')())
}

</i><b>server.use(serveCookie)</b><i>
server.use(express.static('public'))
server.use('/', router)

server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})</i>
```


If `nodemon` is still running, then you'll see an error in the Terminal that includes the some detail like this:
```bash-s
# lines skipped here
```
```bash-w
[nodemon] starting `node server.js`
/path/to/MyProject/backend/node_modules/express/lib/application.js:217
    throw new TypeError('app.use() requires a middleware function')
    ^
    
TypeError: app.use() requires a middleware function
    at Function.use (/path/to/MyProject/backend/node_modules/express/lib/application.js:217:11)
    at Object.<anonymous> (<b>/path/to/MyProject/backend/server.js:23:8</b>)
```
```bash-s
# and more linse skipped here
```

Can you see where it tells you the exact line in your `server.js` script where the error occurred, and that the reason was because Express _requires a middleware function_?

<details class="note" open>
<summary>Different line number?</summary>
The line number that is given for `backend/server.js:...)` might be different for you, because your script might have different lines.

</details>
</section>