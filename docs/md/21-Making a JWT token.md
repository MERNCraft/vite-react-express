<!-- Making a JWT token -->
<section
  id="making-a-jwt-token"
  aria-labelledby="making-a-jwt-token"
  data-item="Making A JWT Token"
>
  <h2><a href="#making-a-jwt-token">Making A JWT Token</a></h2>

Just to remind you what we are working on:

When someone asks the server for the `index.html` , the server needs to:

* Create a token
* Wrap the token in a cookie
* Respond to the requests with the `index.html` and the cookie.

But what exactly should the token contain?

When you register at a hotel, it's likely that the hotel will give you a key with a big clunky fob (so you don't forget to give it back later). On the fob is written:

* The name-and-address of the hotel
* Your room number

If you have that key, you can open that room in that hotel. It will probably also open the front door of the hotel, if that is ever locked.

The token that you are going to create will contain:

* The _origin_ of the server

That is: the protocol, the host name and the port number where the server is running. In other words, the token will say: "You have the right to enter here".

## jsonwebtoken

A key is precision-made. The tool for making such a key for your server is a Node package called `jsonwebtoken`. You can find out all about JSON Web Tokens on [JWT.io](https://jwt.io/). 

<details class="note" open>
<summary>JWT tokens</summary>
The written abbreviation is JWT, and  the conventional spoken name for them is "joot token", as if the "w" were a long "uu" sound, and the "t" that stands for "token" is also explicitly spoken aloud. Like the "N" in PIN number.

</details>

A JWT token is treated in two ways:

* Its contents are encoded using the [Base64Url](https://en.wikipedia.org/wiki/Base64) scheme, to make it easy to transfer it over the Internet
* Its encoded contents are hashed, using your secret key, to create a signature, which is then appended to the encoded contents.

This means that anyone can use Base64Url decoding to _read_ the contents, but if anyone tries to _change_ the contents, the contents will no longer match the signature.

When your server receives such a token, it can re-hash the contents part of the message using its secret key, and check that the result matches the signature. You can find [a full explanation of this](https://jwt.io/introduction) on the JWT.io site. 

The `backend/jwToken.js` script below takes care of all this for you. If you want to understand the details, you'll find that the concepts used to write this script are described in the [official documentation for jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken).

The important points to note are that:

* The `payload` that you will provide as input will be the origin of your server. For now, this is `"http://localhost:3000"`.
* The output will be a not-so-short, unreadable string, such as 

```bash-w
"eyJhbGciOiJIUzI1NiJ9.aHR0cDovL2xvY2FsaG9zdDozMDAwLw.uCiWAKmFSuGayhuHg2XxTpiF858Dpoqlf8CFMZwR6dw"
```


1. Open a Terminal window in the `backend/` folder
2. Run the command...
   ```bash-w
   npm i jsonwebtoken
   ```
   ... to install the package in the `node_modules` directory.
3. Create a file at `backend/jwToken.js` and paste the following into it.
```js
/**
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

  // Overwrite DEFAULTS with explicit options with the same key
  options = { ...DEFAULTS, ...options }

  const token = jwt.sign(
    payload,
    JWT_SECRET,
    options
  )

  return token
}

module.exports = {
  getToken
}
```


Now, to actually create such a token and use it as the filling for a cookie...

</section>