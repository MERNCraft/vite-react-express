<!-- Serving the cookie -->
<section
  id="serving-the-cookie"
  aria-labelledby="serving-the-cookie"
  data-item="Serving The Cookie"
>
  <h2><a href="#serving-the-cookie">Serving The Cookie</a></h2>

You've created the JWT token filling for the cookie, but now it's time to create the cookie itself.
  
Serving cookies is going to require a new Node package. There are [several packages that can handle cookies that are listed on the `npm` site](https://www.npmjs.com/search?q=cookie) — over 4000 when I last visited. I've chosen to work with is [Doug Wilson's cookie-session](https://www.npmjs.com/package/cookie-session), because the examples given in the documentation are explicitly designed for Express middleware. And because Doug Wilson has been a leading member of the Express development team.

<details class="tip" open>
<summary>A different package?</summary>
Perhaps you'll be working with a team that has chosen a different package from me. If that's the case, I suggest that you work through this tutorial using `cookie-session`, and then work with your team to integrate their preferred Node package and understand its specific advantages.

</details>

## What does `cookie-session` do?

The `cookie-session` middleware package manages a `req.session` object.

But what is a session? A session is a series of requests that all relate to the same goal. For example, when you visit a shopping site, you make make one request to put an item in your shopping cart, then another request to indicate your shipping address, and a third request to provide payment.

On the first request, the server can create a session cookie and add data to it concerning this first request. It then sends the cookie to your browser, which sends it back again when it makes the second request. The server can now read the data that it set as a result of the first request, and treat the second request accordingly.

The `cookie-session` middleware package allows the server to read items in the `req.session` object, as it arrives fresh from the client, and to add or modify these items before passing the modified cookie on to the `res` object to be sent back to the client.

## Like a wristband

`cookie-session` is well suited to the current scenario. It manages a single cookie which contains just a small amount of data. This is all that you need in this particular case.

Typically, the `index.html` file will be requested only once. There will be no cookie associated with this initial request, so `cookie-session` will create one and add the `pass` token to it. The cookie will be sent with any subsequent API requests, but it will never need to be changed.

It will act a bit like the wristband you get when you go to an event. You can't take it off and give it to someone else, but so long as you are wearing it, you can leave the event and come back in again.

## Setting up the server

To use the `cookie-session` middleware package, you'll need to:

1. Activate the Terminal window that is open on your `backend/` directory
2. Run the command...
   ```bash-w
   npm i cookie-session
   ```
   ...to install the required dependencies in your `node_modules` directory
3. Open your `backend/server.js` script
4. Add code in four places, as shown in the listing below:
	- To load the `cookie-session` middleware module.
	- To read your `COOKIE_SECRET` from `.env`.
	- To create an object that defines the name of the cookie and its other attributes. (You'll see this object explained below.)
	- To `use()` the `cookie-session` middleware with your chosen options.

<details class="note" open>
<summary>A couple of points</summary>
* Line 17 gives a default value for the `COOKIE_SECRET`, just in case there are no settings for thitem in `.env`
* In line 33, `server.use(cookieSession(...))` is executed just before `server.use(serveCookie)`. This means that `req.session` will already exist, even on the first visit to the server (in which case it will be an empty object).

</details>

```js-
<i>/**
 * server.js
 */

require('dotenv').config()
			
const PROD_REGEX = /^(production|prod|staging|release|deploy)$/i
const is_dev = !PROD_REGEX.test(process.env.NODE_ENV)
process.env.IS_DEV = is_dev

const express = require('express')
</i><b>const cookieSession = require('cookie-session')</b><i>
const serveCookie = require('./serveCookie')
const router = require('./router')

const PORT = process.env.PORT || 3000
</i><b>const COOKIE_SECRET = process.env.COOKIE_SECRET || "string needed"

const cookieOptions = {
  name: "pass",
  keys: [ COOKIE_SECRET ],
  httpOnly: true,
  sameSite: true
}</b><i>

const server = express()
if (is_dev) {
  // Accept all requests... but only in dev mode
  console.log("🤚USING CORS FOR DEVELOPMENT")
  server.use(require('cors')())
}

</i><b>server.use(cookieSession(cookieOptions))</b><i>
server.use(serveCookie)
server.use(express.static('public'));
server.use('/', router)

server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})</i>
```


## `cookieOptions`

The `cookieSession` middleware reads in the `cookieOptions` object that you have created.

| Key  | Value                  |
| ---- | ---------------------- |
| name | A sttring which sets the property name to use for the session cookie. If you omit the `name` property, the name `"session"` will be used by default. |
| keys | An array which contains at least one string. The first entry will be used to sign the cookie, to ensure that it has not been altered by a third party.                   |
| [httpOnly](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#block_access_to_your_cookies) | A boolean. If set to true, then JavaScript on the browser will have no access to the cookie. This is `true` by default, but it's important to be sure that it is set. |
| [sameSite](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#controlling_third-party_cookies_with_samesite) | A boolean. If set to true, this cookie will only ever be sent to the site where it was set. When you visit other sites, they will not even know that this cookie exists. |


## Adding a pass to `req.session`

Now that `req.session` exists, it's easy to add the `pass` token that you created earlier to it.

1. Edit `backend/serveCookie.js` so that it matches Listing 58 below. (Note that the `console.log(...)` statements are gone.)

```js-
<i>/**
 * backend/serveCookie.js
 */

const { getToken } = require('./jwToken')

module.exports = (req, res, next) => {
  const { path } = req
  
  if ( path === "/" || path === "index.html" ) {
     // The request is for the index.html page at the origin
     const protocol = req.protocol
     const host = req.headers.host
     const origin = `${protocol}://${host}/`

     // Create a token to record the origin that was requested...
     const pass = getToken(origin)
     </i><b>// ... and serve it as session cookie.
     req.session.pass = pass
 
     // All API requests need a token with this origin as referer</b><i>
   }

  next()
}</i>
```

</section>