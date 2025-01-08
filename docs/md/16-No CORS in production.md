<!-- No CORS in production -->
<section
  id="no-cors-in-production"
  aria-labelledby="no-cors-in-production"
  data-item="No Deployed CORS"
>
  <h2><a href="#no-cors-in-production">No CORS In Production</a></h2>

Adding the `cors` module, as you have just done, means that anyone can gain access to your backend server. During development, this is not a problem. You are not exposing your development backend to the Bad Guys on the Internet.

## Using environment variables

You want to make sure that the `cors` module does **not** give anyone access to your backend when the server is running in production mode. This means finding a way to tell your backend server that it ***is*** running in production mode. One conventional way of doing this is to add a hidden `.env` file containing the string `NODE_ENV=production`.

<details class="tldr">
<summary>Environment variables</summary>
The `.` dot in front of the file name will make your operating system hide the file by default. Code editors like VS Code know this, and they will allow you to see the file, even if your operating system does not.

The string "env" in `.env` and `NODE_ENV` is short for "environment". Often the string `dev` or `development` is used to describe the safe environment that you work in as you are creating a project. For a secure production mode, several different terms may be used, including 

* production
* prod
* release
* deploy
* staging

Note: `staging` is a half-way stage between development and production. It's an online environment that is not accessible to the Internet at large, where a production-ready version of the site is tested before it is official released.

</details>

## `process.env`

When you run a script using `node` (or `nodemon`), NodeJS gathers together lots of information about the environment you are working on. This includes, for example, the path to the `node` executable that is running your script. This information is made available in a global object called `process.env`. To test this, you can make the following temporary change to your `server.js` script.

1. Add a line at the very beginning of your `server.js` script:

```js
<i>/**
 * server.js
 */

</i><b>console.log("process.env:", JSON.stringify(process.env, null, 2))
</b><i>
const express = require('express')
const router = require('./router')
const PORT = 3000

const server = express()
server.use(require('cors')())
server.use(express.static('public'));

server.use('/', router)

server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})</i>
```
4. Look at the Terminal where `nodemon` is running. The details you see will be different from what you see below.  But there will be many of them.

```bash-w
[nodemon] restarting due to changes...
[nodemon] starting `node server.js`
process.env: {
  TERM_PROGRAM: 'vscode',
  rvm_bin_path: '/Users/yourname/.rvm/bin',
  NODE: '/path/to/bin/node',
```
```bash-s
# 60 or more lines skipped
```
```bash-w
  COLORTERM: 'truecolor'
}
Server listening at http://localhost:3000
```


## Adding to `process.env`

You can use a Node package called `dotenv` to add your own data to `process.env`. Typically, you would do this as the very first action of the first script that runs. Here's how you can test this for yourself.

1. Open a Terminal on your `backend/` directory
2. Run the command...
   ```bash-w
   npm i dotenv
   ```
   ... to install the `dotenv` package into the `backend/node_modules` directory

To add your own keys and values to `process.env`:

3. Create a file at `backend/.env`
4. Enter the key-value pairs below:
   
```bash
NODE_ENV=production
PORT=3333
```


Edit `backend/server.js`, to...

5. Include a new line at the beginning
6. Read the value of `PORT` from the `.env` file

... as shown below.

```js
<i>/**
 * server.js
 */

</i><b>require('dotenv').config()</b><i>
console.log("process.env:", JSON.stringify(process.env, null, 2))

const express = require('express')
const router = require('./router')
const PORT = </i><b>process.env.PORT || 3000</b><i>

const server = express()
server.use(require('cors')())

server.use(express.static('public'));
server.use('/', router)

server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})</i>
```

7. In the Terminal where `nodemon` is running, stop `nodemon` by pressing `^C` (Ctl-C). You need to do this because `nodemon` does not watch for changes in `.env`, so you must restart it manually.
8. Restart `nodemon` by running `npm start`. (You can press the Up Arrow on your keyboard to avoid typing this again.)
9. Look in the Terminal.

This time, the keys and values that you entered should appear at the end of the long list of items:

```bash-w
<i>[nodemon] starting `node server.js`
process.env: {
  TERM_PROGRAM: 'vscode',
  rvm_bin_path: '/Users/yourname/.rvm/bin',
  NODE: '/path/to/bin/node',
  
  ... and many many more lines

  COLORTERM: 'truecolor',
  </i><b>NODE_ENV: 'production',
  PORT: '3333'</b><i>
}
Server listening at http://localhost:3333</i>
```


Notice that your server is now running on the custom `PORT` number that you defined in your `.env` file.

Notice also that _all the values_ in `process.env` are strings. The value for `PORT` is not the _number_ `3333` but the _string_ `"3333"`. Remember this. You'll need this insight later.

## `dotenv.config()`

The line `require('dotenv').config()` is all that you need to load the `dotenv` package and get it to run the code that adds data from `.env` to `process.env`. Your custom variables are now available to any script that is run by this process.

<details class="env" open>
<summary>`require` or `import`?</summary>
If you prefer to work with JavaScript modules, which use `import` instead of `require`, the command you should use is:

```js-w
import 'dotenv/config'
```

See the [official documentation](https://www.npmjs.com/package/dotenv#%EF%B8%8F-usage) for details.

</details>

Now that you've seen how it works you can:

10. Delete the following temporary line from `server.js`. Your Terminal window will thank you for it.
```javascript-#6
console.log("process.env:", JSON.stringify(process.env, null, 2))
```

</section>