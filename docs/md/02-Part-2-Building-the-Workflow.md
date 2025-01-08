<!-- Part 2 Building the Workflow -->
<section
  id="building-the-workflow"
  aria-labelledby="building-the-workflow"
  data-item="Building The Workflow"
>
  <h1><a href="#building-the-workflow">Part 2: Building The Workflow</a></h1>

In this part, you will start with an empty directory, and bit-by-bit build the workflow that you have just tested.

You will get practice in working in several different execution environments:

| Environment | Description |
| ----------- | ----------- |
| development | Your frontend will be served by Vite's development server, your backend by Express, both with the HTTP protocol. Vite's Hot Module Reload feature will allow you to see your frontend changes in real time in the browser.                                                                                                                                                                                           |
| preview     | At regular intervals, you will use a custom `npm run publish` script. This creates a folder containing static files for your frontend, and copies these automatically to the `public/` folder in your backend. Both frontend and backend will be served by your Express server over HTTP.<br>This will allow you to preview the way your site will work in production, without the need to deploy to a remote server. |
| production  | You will create a GitHub repository for your backend (including the `public` files created by your frontend) and deploy it to a hosting service. The site will be delivered securely over HTTPS. 
</section>