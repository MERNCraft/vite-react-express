<!-- Automating the workflow -->
<section
  id="automating-the-workflow"
  aria-labelledby="automating-the-workflow"
  data-item="Automated Workflow"
>
  <h2><a href="#automating-the-workflow">Automating The Workflow</a></h2>
  
Earlier, when you ran `npm run publish`, your `publish.sh` script synchronized the files between `frontend/dist/` and `backend/public/`. However, to create and populate the `frontend/dist/` directory with the files created by Vite, you had to run `npm run build` from the `frontend/` folder manually.

Can you guess how you can change the `"scripts"` block in the `package.json` file in the parent folder, so that you can do both actions at once?

Here's what the `"scripts"` block in the `package.json` file in the parent folder looks like now:

```json-#5
  "scripts": {
    "backend": "npm --prefix ./backend start",
    "start": "npm run backend",
    "publish": "./publish.sh"
  },
```


And here's what the `"scripts"` block in the `package.json` file that Vite created for you in the `frontend/` folder looks like:

```json-#6
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
```


What you want to do is run a single command in the Terminal when it is active in the parent folder that will:

- Tell the `frontend/` to run the `"build"` command, to regenerate the `frontend/dist/` directory
  
  and then

- Tell the `publish.sh` to run

<details class="challenge" open>
<summary>Editing `MyProject/package.json`</summary>

1. Open the file at `MyProject/package.json`
2. Take a look at the `"backend"` script: 
```json-#6
"npm --prefix ./backend start"
```

3. You can use this pattern to call `build` in the frontend:
  
```bash-w
"npm --prefix ./frontend run build"
```
   
4. Edit the current `"publish"` script to run the `"build"` script first and then the `publish.sh` script.

<details class="solution" open>
<summary>Hint</summary>
Earlier you ran `npm i && npm run dev` to install all the Vite dependencies and then start the Vite development server. As you may recall, the `&&` operator ensures that the first process is completed successfully before the second process starts.

</details>

<details class="solution" open>
<summary>Solution</summary>
```json-#6
  <i>"scripts": {
    "backend": "npm --prefix ./backend start",
    "start": "npm run backend",
    </i><b>"build": "npm --prefix ./frontend run build",
    "publish": "npm run build && ./publish.sh"</b><i>
  },</i>
```

</details>

</details>



</section>