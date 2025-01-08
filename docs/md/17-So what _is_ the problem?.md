<!-- So what is the problem? -->
<section
  id="so-what-is-the-problem"
  aria-labelledby="so-what-is-the-problem"
  data-item="What's the Problem?"
>
  <h2><a href="#so-what-is-the-problem">So What Is the Problem?</a></h2>

Back in section [29. Using `nodemon`](#using-nodemon) I suggested there was a problem with the fact that [http://localhost:3000/ping](http://localhost:3000/ping) worked. What is that problem?

In your browser, visit [http://localhost:5173/ping](http://localhost:5173/ping). What do you see? You see the same page that you would see if you visit [http://localhost:5173](http://localhost:5173/ping) without the `/ping` path.

![The development frontend behaves the same regardless of the path](images/5173_ping.webp)

That's good. That means that Vite's development server is not leaking any data to anyone who visits an API endpoint directly from their browser address bar (or any other API client, such as [Postman](https://www.postman.com/)).

But what if you visit the `/ping`API endpoint using your Express server, at [http://localhost:3000/ping](http://localhost:3000/ping) ?

![A direct request from the browser address bar to a backend endpoint](images/3000_ping.webp)

Ouch! There it is! That's bad. You do not want your backend API to send any data to someone who just happens to make a direct request for it. You want your server to detect whether the request came through an official page, officially served by the server itself.

Already, back in section [29. Using `nodemon`](#using-nodemon), you could see that data that you might want to hide is available for anyone to see. At that point, though, you were probably happy that the request to [http://localhost:3000/ping](http://localhost:3000/ping) was working and your project was advancing.

<details class="pivot" open>
<summary>Keeping the server's secrets</summary>
In this particular case, the only secret that the client didn't already know is the time zone, but the same thing would happen with GET requests for data from your database, and you might not realize what a treasure this could be for your competitors.

The next step will be to fix this, by requiring authentication for any API requests to the server.

</details>

</section>