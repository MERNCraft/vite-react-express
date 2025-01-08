<!-- Treating an API request -->
<section
  id="treating-an-api-request"
  aria-labelledby="treating-an-api-request"
  data-item="An API Request"
>
  <h2><a href="#treating-an-api-request">Treating An API Request</a></h2>
  
When I first start working on a backend project, I like to create a simple `/ping` route that will return:

- Information about where the request came from
- The address of the server that received it
- The current time and date

This gives me a sanity check that my backend is up and running and responding to requests.

1. In `backend/`, create a script called `router.js`
2. Paste in the code from the code listing below. Take a few minutes to see if you can understand what it does. But no worries: I'll explain in detail in a moment.

```javascript
/**
 * backend/router.js
 */

const { Router } = require('express')
const router = Router()

router.get("/ping", ping)

module.exports = router

function ping(req, res) {
  const { protocol, path, ip } = req
  const { host, referer, origin } = req.headers
  
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
}
```


3. Update your `server.js` script as shown in Listing 38 below:

```javascript
<i>/**
 * server.js
 */

const express = require('express')
</i><b>const router = require('./router')</b><i>
const PORT = 3000

const server = express()
server.use(express.static('public'));

</i><b>server.use('/', router)</b><i>

server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})</i>
```


3. In a browser window, visit [http://localhost:3000/ping](http://localhost:3000/ping)

Well, that's disappointing.

![Cannot GET /ping](images/cannotGetPing.webp)


</section>