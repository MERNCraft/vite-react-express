<!-- Connecting to the API during development -->
<section
  id="connecting-to-the-api-during-development"
  aria-labelledby="connecting-to-the-api-during-development"
  data-item="API at Dev Time"
>
  <h2><a href="#connecting-to-the-api-during-development">Connecting To The API During Development</a></h2>

When you publish the frontend and serve it from the `public/` directory of your Express server, the technique you've just seen works fine. You set a cookie in the request for `index.html` and for all subsequent API requests, you check that `req.header.referer` matches the payload of the cookie token.

But when you are developing, your frontend is delivered by Vite's development server which typically runs on port `5173`. When you load the `index.html` page from [http://localhost:5173](http://localhost:5173), the server at [http://localhost:3000](http://localhost:5173) never gets to see the request and never sets a cookie.

So when the frontend later makes a request explicitly to [http://localhost:3000/ping](http://localhost:3000/ping), the `checkPass` function says "Hey, there's no cookie! No token, no service."

Try it and see:

1. In your browser visit [http://localhost:5173](http://localhost:5173)
2. Click on the `GET /ping` button

![The frontend gets a `403 Forbidden` response](images/frontend403.webp)

## Check if `IS_DEV` === `"true"`

Back in section [36. No Deployed CORS](#no-cors-in-production), you saw:

* How to set...
  ```bash-
  NODE_ENV=production
  ```
  ... in the `backend/.env` file 
* How to use the `dotenv` NodeJS package to read in the value of `NODE_ENV`
* How to use a regular expression to check that the value was _not_ any of the values conventionally used to indicate production mode
* How to set a new _string_ value for a `process.env.IS_DEV` property.

Now is the chance to use this custom property.

## If `process.env.IS_DEV` is set to `"true"`. 

In `jwToken.js`, you can let any API request go ahead, even without a valid `pass`, if the request was made in the safe development environment.

1. Edit the beginning of your `backend/jwToken.js` to add a line to check the value of `process.env.IS_DEV`
2. Edit the beginning of the `checkPass()` function, to add an `if ... else statement` inside the `if (!pass) {...}` block, so that the operation can proceed during development, even if there is no pass cookie.
	
 Your edits should match what you see in the code listing below.

```js
<i>/**
 * backend/jwToken.js
 */

const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET || "secret needed"</i>
<b>const is_dev = process.env.IS_DEV === "true"</b>
```
```javascript-s
// Some lines skipped
```
```javascript-#32
<i>const checkPass = (req, res, next) => {
  const pass = req.session?.pass
  const referer = req.headers.referer
  console.log("referer:", referer, ", req.path:", req.path)

  let status = 0
  let message = ""

  if (!pass) {
    </i><b>if (is_dev) {
      console.log(`🤚DEV: PASS ${req.path} GIVEN FOR ${referer}`)

    } else {
      status = 403 // Forbidden
      message = "No pass provided"
    }</b><i>

    proceed()

  } else {
    jwt.verify(pass, JWT_SECRET, treatPass)
  }</i>
```
```javascript-s
// all lines to end skipped
```

3. In your browser visit  [http://localhost:5173](http://localhost:5173) again
4. Click on the `GET /ping` button.

This time, the API call should work as expected, in "dev" mode.

![Successful /ping from frontend in dev mode](images/devVitePing.webp)


1. Check the output in the Terminal window where `nodemon` is running your server. You should see a line that indicates that the development frontend was given a free pass, even if it did not send the expected cookie.
```bash-#
referer: http://localhost:5173/ , req.path: /ping
🤚DEV: PASS /ping GIVEN FOR http://localhost:5173/
Connection from
referer http://localhost:5173/
origin  http://localhost:5173
ip      ::ffff:127.0.0.1
for     http://localhost:3000/ping
at      Thu Nov 28 2024 15:43:57 GMT+0100 (Central European Standard Time)
```

So development mode is working. But wasn't there still an issue to address in production mode?

</section>