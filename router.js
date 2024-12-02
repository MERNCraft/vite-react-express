/**
 * backend/router.js
 */


const router = require('express').Router()
const { checkPass } = require('./jwToken')


// Ensure that the call came from a client that has already
// connected and received a token.
router.use(checkPass)


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

  // console.log(message);

  if (res) {
    res.send(`<pre>${message}</pre>`)
  }
}


router.get("/req", (req, res) => {
  res.send(`<pre>
${require("util").inspect(req)}
  </pre>`)
})
