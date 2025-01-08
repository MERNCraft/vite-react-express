<!-- Preparing the pass token -->
<section
  id="preparing-the-pass-token"
  aria-labelledby="preparing-the-pass-token"
  data-item="The Pass Token"
>
  <h2><a href="#preparing-the-pass-token">Preparing The Pass Token</a></h2>

It's time to go back to your `serveCookie.js` script, and connect it to the `jwToken.js` script. You've already isolated the case where the `path` is a request for the `index.html` file. Now you can use some of the ideas that you saw in the `ping()` function to generate an `origin` string.

You'll a new version of the `backend/serveCookie.js` script below. 

**Don't do anything yet. Just take a look at the script.**

The `serveCookie()` function:

- Reads in the `getToken` function that you have just created
- Creates a string variable called `origin`, which will match the address where your server is running. (Almost. Can you spot the difference? I'll explain it later, but I've already give you a clue, in section [35. CORS at Dev Time](#using-cors-in-development) - Figure 17.)
- Uses your new `getToken()` function to get a signed JWT string
- Prints out both the value for `origin` and the JWT token in the console

```js-
<i>/**
 * backend/serveCookie.js
 */</i>

<b>const { getToken } = require('./jwToken')</b>

<i>module.exports = (req, res, next) => {
  const { path } = req
  
  if ( path === "/" || path === "index.html" ) {</i>
     <b>// The request is for the index.html page at the origin
     const protocol = req.protocol
     const host = req.headers.host // includes the port
     const origin = `${protocol}://${host}/`
     console.log("origin:", origin)
     
     // Create a token to record the origin that was requested...
     const pass = getToken(origin)
     console.log("pass:", pass)</b>
   }

  <i>next()
}</i>
```

<details class="challenge" open>
<summary>A challenge</summary>
1. Study the code inside the `if` statement in Listing 56 above
2. Check that you understand what each line does, and why
3. Open your `backend/serveCookie.js` script
4. As a challenge, hide this tutorial page and reconstruct the `if` statement in your own script, from memory, and through your understanding of the process. When you are finished, bring this tutorial back into view again.
5. Compare what you've written with the original. There are likely to be some small differences. Ask yourself if they are likely to cause your code to fail, or if they are just a matter of style.
6. Check in the Terminal window where `nodemon` is running, to see if your server has crashed. If so, check the error message(s) to see where you need to make your fixes.
7. When your server is happily running again, open your browser and visit [http://localhost:3000/](http://localhost:3000/)

</details>

If all goes well, this is what you should see:
```bash-w
[nodemon] restarting due to changes...
[nodemon] starting `node server.js`
🤚USING CORS FOR DEVELOPMENT
Server listening at http://localhost:3000
origin: http://localhost:3000/
pass: eyJhbGciOiJIUzI1NiJ9.aHR0cDovL2xvY2FsaG9zdDozMDAwLw.bRo9CTSJi2PGFLsrvSeTdXulDH6sRH18MQZVs3G69hY
```


##  Spot the difference: `origin` and `referer`

In Figure 17 that you saw earlier, the value for `origin` did not  have a trailing `/` slash character, but the value for `referer` did.

![or "Figure 17 revisited"](images/gotPing.webp)

The `payload` that you have used in your JWT token above should have a trailing `/` character, because it will be matched against `req.headers.referer`. If the values don't match, the server will refuse to treat the API request. So make sure that the value you used as the argument for `getToken()` ends with a trailing slash.

<details class="question" open>
<summary>Whack-a-mole</summary>
Do you see a new problem that you'll need to take care of during development?

Hint: what is the value of `referer` going to be when you are running your React frontend from the Vite development server? And what will be the value that the server will store in the JWT token?

</details>
</section>

