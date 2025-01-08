<!-- NodeJS and npm -->
<section
  id="nodejs-and-npm"
  aria-labelledby="nodejs-and-npm"
  data-item="NodeJS And Npm"
>
  <h2><a href="#nodejs-and-npm">NodeJS And Npm</a></h2>
You can skip this section if you already have a recent version of `NodeJS` and `npm` installed. If not, read on.

## Building on what others have built

To go somewhere in your local city, you don't need to build your own car. Over the years, other people have built a public transport system, and you can simply get on a bus and start heading in the right direction. If the bus doesn't go exactly where you want to go, you can change buses, and walk the last few meters yourself. A bus ticket is much cheaper than owning a car.

To create a web server, you don't need to start from the very beginning. Over the years, many open-source developers have worked together and separately to build a modular set of tools. Like the buses in a public transport system, these tools will do a great job of connecting together to bring very close to where you want to go.

And what's even better: the open-source ride is free.

Well... there is an understanding that if you benefit from the work of others, you will pay it forward by making your own work open source, so that others can benefit from it in turn. (This tutorial is written in that spirit.)

As its [home page](https://nodejs.org/) the NodeJS web site says: 

>Node.js® is a free, open-source, cross-platform JavaScript runtime environment that lets developers create servers, web apps, command line tools and scripts.

You can read about its development [here](https://en.wikipedia.org/wiki/Node.js#History).

Just like a bus is a self-contained unit of transport that works together to build a cohesive transport system, Node Modules are _packages_ of code written for NodeJS, which work together to take your end-user on the journey that you want to create.

For the server that you are about to create, you will be using four Node Modules: Express, dotenv, CORS, jsonwebtoken and cookie-session. (For the frontend, you will be using others.) The equivalent of a bus station for NodeJS packages is `npm`, or Node Package Manager, if you prefer to think of it that way (but [perhaps you shouldn't](https://www.npmjs.com/package/npm#user-content-faq-on-branding)).

I will use the words Node modules and Node packages as synonyms in the text that follows.

You can use `NVM` or Node Version Manager to download and install `NodeJS` and `npm`. You can find instructions on how to do this for your operating system [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
  

</section>
