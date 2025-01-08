<!-- Deploy to Render.com -->
<section
  id="deploy-to-host"
  aria-labelledby="deploy-to-host"
  data-item="Ready to Deploy"
>
  <h1><a href="#deploy-to-host">Part 3: Deploying to a Hosting Site</a></h1>
  
It looks as if your proof-of-concept React site served by Express is ready for deployment.

SPOILER ALERT: It's not. A deployed site will use the secure HTTPS protocol. Can you guess where this will make your server fail when it's deployed?

Below, I'll describe the steps that I use to deploy my server to the free tier on [Render.com](https://render.com/) from a [GitHub](https://github.com/) repository.

In order to deploy to a hosting service, you will need to work in two phases:

### Phase 1: Create a GitHub _repository_
* Have an account on GitHub.com
* Create a repository for your backend on your local computer
* `push` your repository to GitHub.com

### Phase 2: Deploy to Render.cm
* Create an account on Render.com
* Create a new Web Service on Render.com
* Connect your Web Service to your GitHub repository
* Enter some settings details
* Click on a Deploy Web Service button

## Git and GitHub

[Git](https://git-scm.com/) is a distributed version control system that allows you to create a _repository_ for each of your projects. It allows you to create backups at key points in development, and to test new features without breaking stable code.

[GitHub](https://github.com/) is a service now owned by Microsoft. It allows you to store repositories of your repositories in a safe space online. You can think of it as a powerful backup system, which gives other developers the chance to collaborate with you on your projects.

I'll assume that if you have got this far, you already know about GitHub and the Git distributed version control system. If not:

* [Download and install Git](https://git-scm.com/downloads) for your operating system
* Visit the [GitHub Signup page](github.com/signup) and follow the instructions.

After you run `npm run publish`, all the code and assets that you need for your Vite-React + Express project are contained in your `backend/` directory.

## Creating a Git repository of your backend directory

To create a Git repository of your `backend/` directory:

1. Open a Terminal window in your `backend/` directory
2. Run `git init`
```bash-#
$ git init                                   
Initialized empty Git repository in /path/to/backend/.git/
```
3. Create a `.gitignore` file with the following contents:
  
   ```bash-w
   node_modules/
   .env
   .vscode/*
   !.vscode/extensions.json
   .DS_Store
   Icon?
   ![iI]con[_a-zA-Z0-9-]
   ```

   This will ensure that the Git repository will not store any unnecessary or private data. Specifically:

   * Your `backend/node_modules/` will be huge, and your `package.json` and `package-lock.json` files already contain all the information necessary to recreate it. It is a waste of resources to include `node_modules/` in your Git repository.
   * Your `.env` file contains secrets that you don't want to share.
   * The remaining entries in the `.gitignore` file are not critical. Some are personal developer settings; some are generated only in certain circumstances on MacOS and developers on other platforms will consider them like spam.
4. Run `git add . && git commit -m "Initial commit"`

```bash-#
<b>git add . && git commit -m "Initial commit"</b>
[main (root-commit) 2d91860] Initial commit
 11 files changed, 1314 insertions(+)
 create mode 100644 .gitignore
 create mode 100644 jwToken.js
 create mode 100644 package-lock.json
 create mode 100644 package.json
 create mode 100644 public/assets/index-BZVNIzQ0.js
 create mode 100644 public/assets/index-DJaG3xuZ.css
 create mode 100644 public/index.html
 create mode 100644 public/vite.svg
 create mode 100644 router.js
 create mode 100644 serveCookie.js
 create mode 100644 server.js
```

## A public repository on GitHub

To share this local repository online:

1. Visit your GitHub account
2. Click on the Repositories tab
3. Click on the green New Repository button

![Creating a New Repo](images/NewRepo.webp)

4. Fill in the repository name and select the Public radio button, and press Create Repository
   
![Filling in the form for a new repository](images/CreateRepo.webp)

5. On the following page, scroll to the end and copy the three `bash` commands in the "push an existing repository" section.

![The code to `push` an existing repo](images/PushExisting.webp)

6. In the Terminal window open on your `backend/` directory, paste the lines that you have just copied (remember: `Ctrl-Shift-V`):

```bash-w
<b>git remote add origin git@github.com:<you>/<repo>.git
git branch -M main
git push -u origin main</b>
Enumerating objects: 17, done.
Counting objects: 100% (17/17), done.
Delta compression using up to 10 threads
Compressing objects: 100% (17/17), done.
Writing objects: 100% (17/17), 72.12 KiB | 6.01 MiB/s, done.
Total 17 (delta 0), reused 0 (delta 0), pack-reused 0 (from 0)
To github.com:<you>/<repo>.git
 * [new branch]      main -> main
branch 'main' set up to track 'origin/main'.
```

7. Back in your browser, refresh the page for your new repository.
8. You should see a big green button with the name `<> Code`. Click on that. The page should display a dialog that lets you copy the link to your repository that you will need for Render.com.

![The big green Code button](images/CloneCode.webp)

</section>