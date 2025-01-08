<!-- barebones frontend -->
<section
  id="barebones-frontend"
  aria-labelledby="barebones-frontend"
  data-item="A Basic Frontend"
>
  <h2><a href="#barebones-frontend">A Barebones React Frontend</a></h2>
With only a little input in the Terminal, you can create a proof-of-concept React app using Vite.

1. In your Terminal window, run `cd frontend`
2. Run `npm create vite@latest .`

The `.` dot at the end says "in the current directory", so the whole command says: "`npm`, tell Vite to use its latest version to create a new project in this `frontend/` directory, so there's no need to ask for a directory name."

Vite will discover that there is already a `dist/` directory in the current directory, so it will ask you what to do about this:
```bash-w
? Current directory is not empty. Please choose how to proceed: › - Use arrow-keys. Return to submit.
❯   Cancel operation
    Remove existing files and continue
    Ignore files and continue
```

<details class="warn" open>
<summary>No warning?</summary>
If you don't see this warning, it probably means that you did not use a `.` dot in the correct place at the end of the command.

If you see a request for a `Project name`, press `^C` (Ctl-C), and try again with a space and a `.` dot at the end this time.

</details>

You know that the `index.html` file that you created in `dist/` was designed to be thrown away, so you can choose the first option: `❯   Remove existing files and continue`.

3. Use the arrow keys to move the selection to the line that says "Remove files"
```bash-
❯   Remove existing files and continue
```

4. Press the Enter key to tell Vite to delete the `dist/` directory and all its contents, forever

Now you will be asked to select a framework. and some other details.

5. Press the down arrow on your keyboard twice, to select `React` and then press the Enter key.

```bash-#
? Select a framework: › - Use arrow-keys. Return to submit.
    Vanilla
    Vue
<b>❯   React</b>
    Preact
    Lit
    Svelte
    Solid
    Qwik
    Angular
    Others
```


You can choose your favourite variant, but I will keep things simple and select plain `JavaScript`
```bash-#
✔ Select a framework: › React
? Select a variant: › - Use arrow-keys. Return to submit.
    TypeScript
    TypeScript + SWC
<b>❯   JavaScript</b>
    JavaScript + SWC
    Remix ↗
```


6. Make your choice
   
Vite will now get busy and create a default set of files and folders in your `frontend/` directory. When it has finished, your project folder should have a structure like this:
```bash-#
.
├── backend
│   ├── node_modules/
│   ├── package-lock.json
│   ├── package.json
│   ├── public/
│   └── server.js
│
├── frontend
│   ├── README.md
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── public
│   │   └── vite.svg
│   ├── src
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── assets
│   │   │   └── react.svg
│   │   ├── index.css
│   │   └── main.jsx
│   └── vite.config.js
│
├── package.json
└── publish.sh
```


Your Terminal will tell you what to do next:
```bash-#
Scaffolding project in /path/to/MyProject/frontend...

Done. Now run:

  npm install
  npm run dev
```


7. Run `npm i && npm run dev`, instead of what Vite suggests

<details class="note" open>
<summary>&&</summary>
This single line has the same effect as the two suggested lines. In `bash`, the `&&` operator means "don't run the second command unless the first command completed successfully". This is different from what `&&` means in JavaScript, but sometimes it can have the same effect. You can read more about this [here](https://ioflood.com/blog/bash-and-operator/).

Remember this trick. You'll be using it again shortly.

</details>

Vite should start its own built-in development server which listens on port 5173 by default. If you have another Vite project running, then the port number may be different.

```bash-#
VITE v5.4.11  ready in 343 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

8. Press the `Ctl` key (or `Cmd` if you are working on a Mac) and at the same time click on the link `http://localhost:5173`. Your favourite browser should open a new tab and show the default Vite web page.

![The Vite development server running on port 5173](images/vite5173.webp)


If you've worked with Vite before, this should be no surprise.

The next step will be to use your very own Express server to serve the exact same content.
  

</section>