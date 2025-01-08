<!-- Serving React with Express -->
<section
  id="serving-react-with-express"
  aria-labelledby="serving-react-with-express"
  data-item="Serving With Express"
>
  <h2><a href="#serving-react-with-express">Serving React With Express</a></h2>
Now you want to see the same site served from your Express server, running on port 3000. This is the sight you want to see:

![The React frontend served by your Express server](images/vite3000.webp)


Note that the URL in the address bar is [http://localhost:3000](http://localhost:3000.)

I'll explain first how to achieve this result manually, step-by-step, and then I'll show you how to automate it.

1. Ensure that your Terminal window is active in the `frontend/` directory,
2. Run the command `npm run build`
```bash-#
$ npm run build

> frontend@0.0.0 build
> vite build

vite v5.4.11 building for production...
✓ 34 modules transformed.
dist/index.html                   0.46 kB │ gzip:  0.29 kB
dist/assets/react-CHdo91hT.svg    4.13 kB │ gzip:  2.14 kB
dist/assets/index-n_ryQ3BS.css    1.39 kB │ gzip:  0.72 kB
dist/assets/index-C-w0ssRA.js   143.20 kB │ gzip: 46.03 kB
✓ built in 355ms
```

3. Check that there is now a `dist/` directory in your `frontend/` directory. Run `ls -1F`
```bash-#
ls -1F
README.md
<b>dist/</b>
eslint.config.js
index.html
node_modules/
package-lock.json
package.json
public/
src/
vite.config.js
```


4. In the Terminal, run `cd ..` to navigate to the parent folder
5. Run `npm run publish`.

Your `publish.sh` script should run, and copy all the files 
```bash-#
$ npm run publish

> myproject@1.0.0 publish
> ./publish.sh

About to sync files from ./frontend/dist/ to ./backend/public/
building file list ... done
./
index.html
vite.svg
assets/
assets/index-C-w0ssRA.js
assets/index-n_ryQ3BS.css
assets/react-CHdo91hT.svg

sent 151122 bytes  received 142 bytes  302528.00 bytes/sec
total size is 150669  speedup is 1.00
Files successfully synced.
```


6. Refresh the browser window that is connected to your Express server at `http://localhost:3000`.

You should see the Vite default page, just like in the image above.

This took more steps than necessary. With a few simple changes to the `package.json` file in the parent directory, you can reduce it to one.

</section>