<!-- Accessing the API from the frontend -->
<section
  id="accessing-the-api-from-the-frontend"
  aria-labelledby="accessing-the-api-from-the-frontend"
  data-item="Frontend API Access"
>
  <h2><a href="#accessing-the-api-from-the-frontend">Accessing The API From The Frontend</a></h2>

Vite automatically creates a placeholder page for you that demonstrates some minimal React interactivity. My first step in any project is to tear this out and replace it with something that does something interesting.

For this project, sending a request to `/ping` is something interesting. To do that, you'll need to create a new script and make changes to two others.

1. Create a new script at `frontend/src/components/Ping.jsx` with the code from the listing below.

```javascript
/**
 * frontend/src/components/Ping.jsx
 */

import React, { useState } from 'react'

export const Ping = () => {
  const [ response, setResponse ] = useState("")
  
  const getPing = () => {
    fetch(`/ping`)
      .then(incoming => incoming.text())
      // WARNING: text really should be sanitized, but not yet
      .then(text => setResponse(text))
  }
  
  return (
    <>
      <button
        onClick={getPing}
      >
        GET /ping
      </button>
      <pre>
        {response}
      </pre>
    </>
  )
}
```

2. Replace the contents of `frontend/src/App.jsx` with the code below.

```javascript
/**
 * frontend/src/App.jsx
 */
 
import './App.css'
import { Ping } from './components/Ping'

function App() {
  return (
    <>
      <Ping/>
    </>
  )
}

export default App
```

3. Replace the contents of `frontend/src/App.css` with the styles shown below:

```css
/**
 * frontend/src/App.css
 */

pre {
  border: 1px inset #888;
  width: fit-content;
  min-width: 25em;
  min-height: 7em;
  overflow: auto;
}
```

<details class="note" open>
<summary>More explanations needed?</summary>
I'm going to assume that you are already sufficiently familiar with React and `fetch()` and `Promises` to understand what is going on in these scripts. If not, click on Feedback link in the hamburger Menu on the left, and let me know.

</details>

4. In the Terminal window where the parent folder is active, run the command...
   ```bash-w
   npm run publish
   ```
   ... to update the files in the `backend/public/` directory.
5. Visit `http://localhost:3000`, which `nodemon` should have restarted for you. (Note: this URL does not include the `/ping` path)
6. You should see your custom React page, with a `GET /ping` button. Click on `GET /ping`.

You should see something like this:

![When `backend/public/index.html` makes a request for the `/ping` endpoint](images/localping.webp)

Notice how the value for `referer` is now set, because the request came from a script inside the page loaded from [http://localhost:3000/](http://localhost:3000/). However, the browser did not send an `origin` header, because the `referer` has the same host as the server to which the request is being made.

<details class="note" open>
<summary>The `<pre>` element</summary>
There are `<pre> ... </pre>` tags around the output. This is because `server.js` is sending a pre-formatted HTML string, so that a direct request for [http://localhost:3000/ping] will look good in the browser.

**In production, you should never use `element.innerHTML = <some unverified string>`**, because a malicious actor could include executable code in it. This is a reminder of the need to sanitize data from any unreliable source before you use it. I've left the incoming string untouched for now because, in the next step, the value you receive will not be what you expect, and it will be helpful to see it all. 

It's OK. This is happening under your control, in development mode, so nothing bad will happen.

</details>

<details class="pivot" open>
<summary>What about that _other_ problem though?</summary>
At the end of the last section, I suggested there was a problem with the result of a direct request for [http://localhost:3000/ping](http://localhost:3000/ping).  Do you see that problem yet?

What you see now is the same kind of data that you saw earlier, when you accessed  [http://localhost:3000/ping](http://localhost:3000/ping) directly. That's good isn't it? You _should_ get the same data through the frontend client app _and_ through direct access, shouldn't you? Or shouldn't you?

</details>

</section>

