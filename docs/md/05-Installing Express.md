<!-- Installing Express -->
<section
  id="installing-express"
  aria-labelledby="installing-express"
  data-item="Installing Express"
>
  <h2><a href="#installing-express">Installing Express</a></h2>
Node packages can do most of your work for you. A bus will not deliver you directly to your door. You will have to complete the last part of your journey on foot.

All in all, you will be using five Node Modules to build your server: `Express`, `dotenv`, `CORS`, `jsonwebtoken` and `cookie-session`. For the frontend, you will be using others. For now though, you can start with just [Express](https://expressjs.com/).

To install Express for your project:

1. In a Terminal, navigate to the `backend/` directory in your project
2. Make sure that you have an Internet connection
3. Run the command `npm i express`

The `i` here stands for `install`. You could type `npm install express` if you want, but programmers like to be lazy, and they make themselves shortcuts for everything that they have to do often.

## What the `npm i` command does

The `npm install` command connects to the `npm` web site and downloads all the Node Modules that you'll need to run an Express server. You'll see a lot of information appearing in your Terminal window, ending up with something like this:
```bash-#
added 65 packages, and audited 66 packages in 2s

13 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

## `node_modules/`

You'll also see that a new directory called `node_modules` has appeared in your `backend/` directory, along with two files called `package.json` and `package-lock.json`. If you open the `node_modules/` directory, you will find it full of folders. There will be one called `express`, and all the others will be the _dependencies_ that Express requires in order to run. You have basically downloaded an entire transport network that ensures that the data your project needs gets shipped to the right places in good time.

## `package.json`

Open the `package.json` file. It should look something like this:
```json
{
  "dependencies": {
    "express": "^4.21.1"
  }
}
```

The version number that you see might be different. That's OK. 

This `dependencies` block describes all the Node Modules that your project needs to work with. This is what tells the Node Package Manager what packages to download.

The `package-lock.json` file gives even finer detail. It lists all the dependencies, with their actual version numbers, that have been installed for you in the `node_modules/` directory. If you give these two files to a co-worker, and they put them in a directory and run `npm i` in the Terminal, `npm` will download _exactly the same files_ for your co-worker. This ensures that you can work together with exactly the same tools.
  

</section>