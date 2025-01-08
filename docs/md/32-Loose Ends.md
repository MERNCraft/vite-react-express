<!-- Loose Ends -->
<section
  id="loose-ends"
  aria-labelledby="loose-ends"
  data-item="Loose Ends"
>
  <h2><a href="#loose-ends">Loose Ends</a></h2>

Your proof-of-concept project is now working but there are still some places that it could be tidied up. None of the changes mentioned here will affect the way the workflow itself works. They are optional, but recommended.

1. Stop using `console.log()`
2. Use a production-strength logging system that generates log files instead
3. Store the path that allows the frontend to connect with the backend in a centralized place

## Remove unneeded `console.log()`s

The only `console.log()` statements that you really need are:

* In `backend/server.js`
	* ``console.log("🤚USING CORS FOR DEVELOPMENT")``
	* ``console.log(`Server listening at http://localhost:${PORT}`)``
* In `backend/jwToken.js`
	* ``console.log(`🤚DEV: PASS ${req.path} REQUEST FOR ${referer}`)``

You can comment out or delete all other occurrences.

## A production-strength logging system

When your server is deployed, you want to log all incoming requests and errors in `.log` files that you can consult at any time. This is not the focus of the current tutorial. For more details, you can read [this article](https://betterstack.com/community/guides/logging/how-to-install-setup-and-use-winston-and-morgan-to-log-node-js-applications/) by [Ayooluwa Isaiah](https://github.com/ayoisaiah), and use [this repo](https://github.com/MERNCraft/backend-logging) as a starting point for your explorations.

## Centralize storage of backend URL

Currently, only the `fetch()` method in the `Ping.jsx` script makes a call to the backend API. In development mode, it needs to connect to the server at the location you set in `frontend/.env`. In production mode, it needs to use connect to its own root.

In a real project, other scripts will need to know where to find the server to connect to the backend API. One excellent way of doing this with React is to use a [Context](https://react.dev/learn/passing-data-deeply-with-context). This means:

- Creating a special script to serve a Context and a Context Provider
- Wrapping any components that need access to the Contetxt in the Provider
- Importing the Context into any component that needs it
- Using `useContext` to access the `value` object provided by the Context

## Creating an API Context and Provider

1. Create a new script at `frontend/src/contexts/APIContext.jsx`
2. Use the script shown below:

```js
/**
 * frontend/contexts/APIContext.jsx
 */

import React, { createContext } from 'react'

const ORIGIN = import.meta.env.VITE_ORIGIN
const dev = /^localhost:517\d$/.test(window.location.host)
const origin = dev ? ORIGIN : ""

export const APIContext = createContext()

export const APIProvider = ({ children }) => {
  return (
    <APIContext.Provider
      value ={{
        origin
      }}
    >
      {children}
    </APIContext.Provider>
  )
}
```

This exports two objects: `APIProvider` and API `Context`. The `APIContext` provides a `value` object where `origin` is set to the value read in from `frontend/.env` during development or to `""` in production.

3. Edit your script at `frontend/src/App.jsx` to match the code below:

```js
<i>/**
 * frontend/src/App.jsx
 */
 
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import './App.css'
import { Ping } from './components/Ping'
import { Page1 } from './pages/Page1'
import { Page2 } from './pages/Page2'
import { NotFound } from './pages/NotFound'
</i><b>import { APIProvider } from './contexts/APIContext'</b><i>

function App() {
  return (
    <Router>
      </i><b><APIProvider></b><i>
        <Routes>
          <Route index element={<Page1 />} />
          <Route path="/page1" element={<Page1 />} />
          <Route path="/page2" element={<Page2 />} />
          <Route path="/ping" element={<Ping />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </i><b></APIProvider></b><i>
    </Router>
  )
}

export default App</i>
```

Notice how this imports `APIProvider` and wraps it around the `<Routes>` tag, so that all components, including `Ping` will have access to the `APIContext` that it provides.

4. Edit your `frontend/src/components/Ping.jsx` script so that it matches Listing XXX below:

```js-
<i>/**
 * frontend/src/components/Ping.jsx
 */

import React, { useState</i><b>, useContext</b><i> } from 'react'
import { APIContext } from '../contexts/APIContext'
<s>const ORIGIN = import.meta.env.VITE_ORIGIN
const dev = /^localhost:517\d$/.test(window.location.host)
const origin = dev ? ORIGIN : "" // "" in production mode</s>
const TAG_REGEX = /(<.*?>)|(<\/.*?>)/g

export const Ping = () => {
  </i><b>const { origin } = useContext(APIContext)</b><i>
  const [ response, setResponse ] = useState("")

  const getPing = () => {
    fetch(`${origin}/ping`)
      .then(incoming => incoming.text())
      // Always sanitize data from unreliable sources
      .then(text => text.replace(TAG_REGEX, ""))
      .then(text => setResponse(text))
      .catch(error => setResponse(error.message))
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
}</i>
```

Notice that this:

- Imports `useContext` from `react`
- Imports `APIContext` from your new script
- Uses `useContext(APIContext` to obtain the value of `origin`

You can use the same technique in any other script that needs to call the backend API.

5. In a Terminal that is open on your parent directory, run `npm run publish`
6. In a Terminal that is open on your `backend/` directory, run:

```bash-w
git add . && git commit -m "Use Context for backend origin"
```

7. Run:

```bash-w
git push
```

8. Visit your dashboard on Render.com
9. Click on the Manual Deploy button and choose `Deploy Latest Commit`

</section>