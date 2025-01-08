<!-- Checking the cookie -->
<section
  id="checking-the-cookie"
  aria-labelledby="checking-the-cookie"
  data-item="Checking The Cookie"
>
  <h2><a href="#checking-the-cookie">Checking The Cookie</a></h2>

When you connect to the Express server [http://localhost:3000/](http://localhost:3000/), a cookie named `pass` is set in your browser, and sent back to the server with every subsequent request. Now you need to tell your server:

- To check that the `pass` cookie exists
- To check that its payload still matches its signature
- To check that its payload matches the `referer` value read from the request header

If all these things are true, your server can process the API request, run any necessary server-side code, and send the appropriate response. If any of these things are not true, the server should immediately respond with a `40x` status and a message that means something like "Cease and desist. You are not welcome."

Here's a function that can do this:

```js
const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET || "secret needed"

const checkPass = (req, res, next) => {
  const pass = req.session?.pass
  const referer = req.headers.referer
  console.log("referer:", referer, ", req.path:", req.path)

  let status = 0
  let message = ""

  if (!pass) {
    status = 403 // Forbidden
    message = "No pass provided"
    proceed()

  } else {
    jwt.verify(pass, JWT_SECRET, treatPass)
  }

  function treatPass(error, payload) {
    console.log("payload:", payload)
    if (error) {
      status = 401 // Unauthorized
      message = "Unauthorized"

    } else if (payload !== referer) {
      status = 401 // Unauthorized
      message = "Not admitted"
    }

    proceed()
  }

  function proceed() {
    if (status) {
      return res.status(status).send({ message })
    }

    next()
  }
}
```


## How it works

It works in three steps.

- First, it assumes that all will be well, and sets the error status to `0`
```js-#9
  let status = 0
  let message = ""
```
- Second, it does some checking, which may either pass or fail. I'll look at that in detail in a moment. If it fails, `status` will be set to a non-zero number, and `message`will be set to a human-readable string.
- Finally, the checking process calls the `proceed()` function. If `status` is still `0`, the `next` middleware or routing function will be called, and the server will treat the request. If `status` was set to a non-zero number, `proceed()` will immediately respond to the request to reject it:
```js-#37
return res.status(status).send({ message })
```

## Checking the token

The `checkPass` function first reads the `pass` cookie from `req.session`. 
```js-#5
  const pass = req.session?.pass
```

Because `cookie-session` was initialized in `server.js` on start-up, you can be pretty sure that `req.session` exists. But if, for some reason it doesn't exist (An interstellar cosmic ray may have zapped a single bit somewhere in the server. Yes, [this does happen](https://www.youtube.com/watch?v=AaZ_RSt0KP8.).), then your server might respond with an error message which gives a stack trace which gives details of how your code works. A high-level hacker could exploit this. Worse: your server would crash. For this reason, I have used the [optional chaining operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining) which ensures that `pass` will be set to `undefined` if `req.session` does not exist.

Next, the `checkPass` function checks if `pass` exists at all. If not, it's clear that the client requesting the API resource did not do the courtesy of downloading `index.html` before making a request to a backend endpoint.
```js-#12
  if (!pass) {
    status = 403 // Forbidden
    message = "No pass provided"
    proceed()

  }
```


If the `pass` token does exist, then the `jsonwebtoken` instance  is asked to check if its signature still matches the payload. It does this by:

* Reading the payload part of the token
* Running the hashing algorithm that was used to create the signature with the same secret key that was originally used.

This process can take a non-negligible amount of time, so it is not run synchronously. The `jwt` instance does this in the background, and when it is done, it calls the `treatPass` callback.

```js-#18
  jwt.verify(pass, JWT_SECRET, treatPass)

  function treatPass(error, payload) {
    if (error) {
      status = 401 // Unauthorized
      message = "Unauthorized"

    } else if (payload !== referer) {
      status = 401 // Unauthorized
      message = "Not admitted"
    }

    proceed()
  }
```

If there was a discrepancy with the signature, then `error` will be truthy, and the server won't be able to trust the `payload`, so no `payload` is sent as an argument to the `treatPass()` function . Yes, perhaps there was a payload, but it's not authorized, so it's ignored: error status  `401`.

## Matching the `referer`

If the signature part of the token matches the newly calculated signature, then `error` will be null, and `payload` will be the value that was initially set. However, there is one last check to make: does the value in the token match the `referer` header that was sent with the request?

This ensures that any misuse of the cookie should fail.



<details class="challenge" open>
<summary>Question 1</summary>
Where should this function go? 

Hint: you may need to change the `module.exports` declaration in the script to this:
```js
module.exports = {
  getToken,
  checkPass
}
```


<details class="challenge" open>
<summary>Question 2</summary>
Where should it be called from?

Hint: earlier you created a `router` to handle all requests that could not be fulfilled by a file in the `backend/public/` directory. The `pass` cookie should be checked before any call to any API route, such as `/ping`.

</details>


<details class="solution" open>
<summary>Solution</summary>
1. Edit your `backend/jwToken.js` file to look like this:

```js
<i>/**
 * backend/jwToken.js
 */

const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET || "secret needed"

const DEFAULTS = {
  algorithm: 'HS256',
  allowInsecureKeySizes: true
}

const getToken = ( payload, options = {} ) => {
  if (typeof options !== "object") {
    // Ignore options if it's not an object
    options = {}
  }

  // Overwrite DEFAULTS with explicit options with same key
  options = { ...DEFAULTS, ...options }

  const token = jwt.sign(
    payload,
    JWT_SECRET,
    options
  )

  return token
}


</i><b>const checkPass = (req, res, next) => {
  const pass = req.session?.pass
  const referer = req.headers.referer
  console.log("referer:", referer, ", req.path:", req.path)

  let status = 0
  let message = ""

  if (!pass) {
    status = 403 // Forbidden
    message = "No pass provided"
    proceed()

  } else {
    jwt.verify(pass, JWT_SECRET, treatPass)
  }

  function treatPass(error, payload) {
    console.log("payload:", payload)
    if (error) {
      status = 401 // Unauthorized
      message = "Unauthorized"

    } else if (payload !== referer) {
      status = 401 // Unauthorized
      message = "Not admitted"
    }

    proceed()
  }

  function proceed() {
    if (status) {
      return res.status(status).send({ message })
    }

    next()
  }</b><i>
}


module.exports = {
  getToken</i><b>,
  checkPass</b><i>
}</i>
```


Note that this script includes two `console.log()` statements, to help you understand what it is doing.

2. Edit your `backend/router.js` file to look like this:
```js-
<i>/**
 * backend/router.js
 */

const { Router } = require('express')
const router = Router()

</i><b>const { checkPass } = require('./jwToken')

// Ensure that the call came from a client that has already
// connected and received a token.
router.use(checkPass)</b><i>

router.get("/ping", ping)

module.exports = router


function ping(req, res) {
  const { protocol, path, ip } = req
  const { host, origin, referer } = req.headers
  
  const message = `Connection from
referer ${referer}
origin  ${origin}
ip      ${ip}
for     ${protocol}://${host}${path}
at      ${Date()}`

  console.log(message);

  if (res) {
    res.send(`<pre>${message}</pre>`)
  }
}</i>
```

</details>
</details>

</section>