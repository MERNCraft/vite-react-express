<!-- Fixing the cookie `payload` -->
<section
  id="fixing-the-cookie-payload"
  aria-labelledby="fixing-the-cookie-payload"
  data-item="The Cookie `Payload`"
>
  <h2><a href="#fixing-the-cookie-payload">Fixing The Cookie `Payload`</a></h2>

During development, you want to check that the `referer` is using the `http` protocol, just like your Express server does. In production, the `referer` will be using the `https` protocol, even if your Express server itself is not.

## Matching with a regular expression

One way to fix this would to use a Regular Expression as the `payload` for the cookie that your server sets. Here's a Regular Expression that matches URLS with either the `https` protocol or the `http` protocol, so long as the domain is `localhost`. Click on the expression to visit a site where you can test it.

[`/^https?:\/\/localhost:3000\//i`](https://regex101.com/r/9Oyv8D/1)

This can be understood as follows:

| Characters  | Meaning |
| ----------- | ------------------------------------- |
| `/`         | Indicates the start (and the end) of the Regular Expression |
| `^`         | Starts matching from the beginning of the string |
| `http`      | Matches a string the exact string `http` |
| `s?`        | Accepts an optional `s` |
| `:`         | Matches exactly the `:` colon character |
| `\/\/`      | Matches `//`. (The `\` backslash characters are needed to indicate that the following `/` does not mark the end of the Regular Expression) |
| `localhost:3000\/` | Matches the exact string `localhost:3000/`                                                                                                 |
| `/`         | Indicates the end of the Regular Expression |
| `i`         | Indicates that the matches are case-insensitive (`HTTP` will match as well as `http`) |

## Setting the cookie token `payload`

You don't want to lock the domain name to `localhost`, but you don't know in advance what domain and subdomain Render.com will attribute to your Web Service. Here's how you can edit your `backend/serveCookie.js` script, so that it creates a payload string similar to the Regular Expression shown above:

```js-
<i>/**
 * backend/serveCookie.js
 */

const { getToken } = require('./jwToken')

module.exports = (req, res, next) => {
  const { path } = req
  
  if ( path === "/" || path === "index.html" ) {
    // The request is for the  index.html page at the origin
    const host = req.headers.host // includes the port
    </i><b>const regex = `^https?:\/\/${host}/`

    console.log("regex:", regex)</b><i>
    
    // Create a token to record the origin that was requested...
    const pass = getToken(</i><b>regex</b><i>)
    // ... and serve it as session cookie.
    req.session.pass = pass

    // All API requests need a token with this origin as referer
  }

  next()
}</i>
```

## Updating `jwToken.js`

Here's how you can edit the `treatPass()` function of the `jwToken.js` script, so that it [creates a Regular Expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) from the new `payload`, and uses that to check the value of `referer`:

```js-#59
<i>function treatPass(error, payload) {
    console.log("payload:", payload)
    </i><b>const regex = new RegExp(payload, "i")</b><i>

    const sendHome = 
       error                // the JWT token was invalid
    </i><b>|| !regex.test(referer) // referer undefined or invalid
</b><i>
    if (sendHome) {
      // Ignore API request: respond with index.html file 
      return res.sendFile(INDEX_HTML)
    }

    proceed() // with API request
  }</i>
```

<details class="note" open>
<summary>sendHome is now simpler</summary>
The evaluation of `sendHome` is actually simpler, because [the `test` method of Regulars Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test) returns `false` if `referer` is not a string. As a result, you know longer need to check if `referer` has a value or not.

</details>

## One last tweak

There is a small chance that visitor might try to connect to `/ping` (or any other path) before ever making a request for the `index.html` page. In this edge case, your server would currently send back a 403 Unauthorized message. It would be cleaner to simply redirect such a request to the root of the site, so that the home page and its cookie is returned instead of an error.

You can edit the `if (!pass} ... else { }` statement as follows, using the [`res.redirect()` method](https://expressjs.com/en/5x/api.html#res.redirect):

```js-#44
  <i>if (!pass) {
    if (is_dev) {
      console.log(`🤚DEV: PASS ${req.path} REQUEST FOR ${referer}`)

    } else {
      </i><b>// Ignore API request: serve home page + cookie instead
      return res.redirect("/")</b><i>
    }

    proceed()

  } else {
    jwt.verify(pass, JWT_SECRET, treatPass)
  }</i>
```

## Pushing changes to GitHub

1. In a Terminal window open on the `backend/` directory, run:

```bash-w
git add . && git commit -m "Fix HTTPS issues"
```

2. Run:

```bash-w
git push
```

3. In the browser window where your Render.com dashboard is displayed, click on the Manual Deploy button and choose Deploy Latest Commit.

![Manual deploy](images/ManualDeploy.webp)

Render.com will run through it full install, build, deploy sequence, and finally it will tell you again that **Your service is live 🎉**.

Test it. Click the link to your web service Check that it now behaves exactly as you would expect.

<details class="note" open>
<summary>Heartbeat</summary>
You'll notice that, every 5 seconds, the console in the Render.com dashboard will print out:

```bash-#
regex: ^https?://vite-react-express.onrender.com/
```

Render.com checks makes a request to your server every 5 seconds, to check that it is still running. If it does not receive the expected response, it will take action to restart your server. You can read more about this [here](https://render.com/docs/deploys?_gl=1%2Ae0fqwh%2A_gcl_au%2AMzY2MjkwOTg1LjE3MzI5MjA2NzA.%2A_ga%2AODcyMjUwODE1LjE3MzI5MjA2NzA.%2A_ga_QK9L9QJC5N%2AMTczMzA0MDcxNC40LjEuMTczMzA0MjI1MC42MC4wLjA.#health-checks).

</details>

</section>