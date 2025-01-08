<!-- Secret ingredients -->
<section
  id="secret-ingredients"
  aria-labelledby="secret-ingredients"
  data-item="Secret Ingredients"
>
  <h2><a href="#secret-ingredients">Secret Ingredients</a></h2>

You don't want anyone else to be able to create a token that gives access to your API. If you create a repository on GitHub for your project, other people can share your code, and build something similar for themselves. But you don't want to give anyone the key that will give access to the API on _your_ server.

The standard place to hide your secrets is in a file named `.env` . You might use different secrets when you are developing than when you deploy your server for production. Your development environment and production environment `.env` files may contain different values for the same keys.

You've already created a `.env` file for your backend, so that you can tell your server when it is running in production mode, and which port number to use.

Now you can add to it the secret ingredients that will use to make the cookie filling.

1. In the file `backend/.env` add two new lines:

```bash
<i>NODE_ENV=dev
PORT=3000</i>
<b>JWT_SECRET=go hang a salami
COOKIE_SECRET=I'm a lasagna hog</b>
```
You should use your own phrases, specifically ones that you think no-one else will guess. There doesn't need to be any connection between them.

</section>