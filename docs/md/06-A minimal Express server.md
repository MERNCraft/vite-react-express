<!-- Simple Express Server -->
<section
  id="simple-express-server"
  aria-labelledby="simple-express-server"
  data-item="Basic Express Server"
>
  <h2><a href="#simple-express-server">A Minimal Express Server</a></h2>

The Express package and the built-in NodeJS modules can do almost all your work for you, but you still need to write a few lines of code.

1. Create a file in the `backend/` directory called `server.js`
2. Give it the content that you see below.

```javascript
/**
 * server.js
 */

const express = require('express')
const PORT = 3000

const server = express()
server.use(express.static('public'));

server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})
```

That's enough to get started with.

Line 5  tells NodeJS to load all the files from the `node_modules/express/` directory (and all the dependencies that _they_ need, which are found in the other directories inside `node_modules/`).

Line 6 defines which [port](https://en.wikipedia.org/wiki/Port_(computer_networking)) your browser can connect to, in order to access your server. You can think of a _port_ as being the computer equivalent of a bus stop. If your browser goes to that point, it will find the service it needs.

Line 8 tells NodeJS to create a `server` object, using all the magic that `express` gives you.

The line ...
```javascript-#9
server.use(express.static('public'));
```

... tells your `server` that, if the server receives a request from your browser for a file that can be found in  the folder `backend/public/`, then that's the file that the `server` should send that file back to the browser.

It takes the Express module many many lines of code to convert the browser's request into a file that is sent back to the browser, but all you need is this one line of code as your ticket for this journey.

Finally, the section... 
```javascript-#11
server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})
```

... tells the `server` to do all the work that is needed to open port 3000 on your local network and to listen on that port for requests from your browser. As soon as the `listen` command is complete, the _callback_ function will log a message in the Terminal window.

All that you need to do now is to start your server.
  
</section>