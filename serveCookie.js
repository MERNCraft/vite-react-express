/**
 * backend/serveCookie.js
 */


const { getToken } = require('./jwToken')

const serveCookie = (req, res, next) => {
  const { path } = req
  
  if ( path === "/" || path === "index.html" ) {
     // The request is for the static index.html page at the origin
    //  const protocol = req.protocol
     const host = req.headers.host // includes the port
     const regex = `^https?:\/\/${host}/`
    //  const origin = `${protocol}://${host}/`
    //  console.log("origin:", origin)

    console.log("regex:", regex)
    
    // Create a token to record the origin that was requested...
    const pass = getToken(regex)
    // ... and serve it as session cookie.
    req.session.pass = pass

    // All API requests need a token with this origin as referer
  }

  next()
}

module.exports = serveCookie