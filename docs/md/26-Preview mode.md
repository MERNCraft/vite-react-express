<!-- Preview mode -->
<section
  id="preview-mode"
  aria-labelledby="preview-mode"
  data-item="Preview Mode"
>
  <h2><a href="#preview-mode">Preview Mode</a></h2>

In development mode, you want to run your backend and your frontend separately, so that a change in one does not require you to update the other. You want the backend to accept connections from a frontend hosted at a different _origin_. Your focus is on expanding and improving your code, and not on tight security.

In development mode, it's fine to run `npm run publish` from time to time, and check that the Express backend can serve the Vite React frontend with no problems, but you don't want to have to `publish` all the time.

In _production_ mode, you consider that your frontend code is stable, and that it's not going to change until the next release version. You want the Express server to behave just as it did during development, but with strong security. You want the backend to ignore any API requests that don't reach it through pages that it served for itself.

And you want your server to run at the chosen origin, on the `PORT` that you specify in the production `.env` file.

It's time to check if all this is true. You can do a test in what I'd like to call _preview_ mode. That is, using the production-level security, but still in a safe environment.

1. Change the entry for `NODE_ENV` in the `.env` file from `dev` to `production`

```bash
<b>NODE_ENV=production</b>
<i>PORT=3000
JWT_SECRET=go hang a salami
COOKIE_SECRET=I'm a lasagna hog</i>
```

2. In the Terminal where `nodemon` is running your Express server, press `^C` to cancel the process
3. Run `npm start`to restart your server now that you have changed the contents of `.env`.

4. In your browser, visit [http://localhost:3000/](http://localhost:3000/)
5. Click on the `GET /ping` button

![The response to GET /ping in pre-production mode](images/production.webp)

That's what you would expect to see.

6. As you did in section [50. Testing the Token](#testing-the-token), visit [http://localhost:3000/ping](http://localhost:3000/ping)

As before, you don't even get a web page. You get a JSON object with the `message: Not admitted`.

![A direct API request from the browser address bar gets rejected](images/jsonDOA.webp)

7. For comparison, now visit the development frontend at [http://localhost:5173/](http://localhost:5173/)
8. Click the `GET /ping` button

![or "Figure 15 revisited"](images/CORS.webp)

The Vite development server provides an `index.html` page to your browser that does not come from the Express server. In production mode, there is no CORS validation for any request from any other source, so the Vite development server has no access at all.

## Results and expectations

All the tests above should give you the results that you expected. Or, to put it another way: you should have been expecting all these results.

9. But what happens if you visit [http://localhost:5173/ping](http://localhost:5173/ping), though? 

![A request from http://localhost:5173/ping: the `/ping` path is ignored](images/prod5173ping.webp)

The `GET /ping` button will still generate a CORS error, but the page itself looks nothing like the JSON formatted error message you saw in Figure 29, when a request was made for  [http://localhost:3000/ping](http://localhost:3000/ping).

The Vite development server _ignores the `/ping` path_ and returns exactly the same `index.html` file as when you visited [http://localhost:5173/](http://localhost:5173/) just now.

This is more polite, isn't it?

## What about a different port?

I wrote above:

> And you want your server to run at the chosen origin, on the `PORT` that you specify in the `.env` file.

As you have just seen, it certainly works on port 3000. It's time to change that.

1. In the `backend/.env`, change the setting for `PORT` to `3333`

```bash
<i>NODE_ENV=production
</i><b>PORT=3333</b><i>
JWT_SECRET=go hang a salami
COOKIE_SECRET=I'm a lasagna hog</i>
```


2. Stop your backend server and restart it as you did in steps 2 and 3 above.
3. Visit  [http://localhost:3000/](http://localhost:3000/)

It shouldn't surprise you that you can't connect to your server on port 3000 any more.

![Unable to Connect](images/unableToConnect.webp)

3. Visit  [http://localhost:3333/](http://localhost:3333/) instead (which should work fine) ...
4. ... and click on `GET /ping` 
5. You get another CORS error. But isn't the `/ping` request coming from an official page, served by the Express server itself?

![GET /ping fails if the PORT is changed](images/pingFails.webp)


I'd warned you about this earlier, back in section [40. Just One More Thing](#just-one-more-thing). Remember?

>Oh... but first, now there's another issue. You can see it if you:
>
>1. Run `npm run publish` in the parent directory
>2. Reload [http://localhost:3000](http://localhost:3000) in your browser
>
>![](images/local_origin.webp)
>
>Do you see it? The value that the frontend is using for `ORIGIN` has been logged to the Console. Sure, it's the right value. But... where was it set? Why was it set? Won't it ever change?
>
>In the files that Vite created during the `build` process, the value for `import.meta.env.VITE_ORIGIN` has been hard-coded in. 

And now you can see that it matters. 

</section>