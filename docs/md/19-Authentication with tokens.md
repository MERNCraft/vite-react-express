<!-- Authentication with tokens -->
<section
	id="authentication-with-tokens"
	aria-labelledby="authentication-with-tokens"
	data-item="Authentication"
>
	<h2><a href="#authentication-with-tokens">Authentication With Tokens</a></h2>
	
You want to allow any API requests that are sent to the backend by your frontend, and to block all API requests that come from any other sources. To do this, you can get your frontend to send an _authentication token_ with all of its requests. Your backend can then check if a given API request comes with a valid token, and block any requests that do not.

To continue the hotel metaphor, the authentication token is an official key for a hotel room door.

## Requests, paths and headers

When a client makes a request to your server, the request URL has two main parts:

- The _origin_ of your backend server. This is comprised of 
	- the protocol
	- the sub-domain names (if any)
	- the domain name or IP address
	- the port number
	
	In the current case, the origin that you are using for your backend server is `http://localhost:3000`.
- The _path_. This consists of everything after the origin (and before any `?` or `#` character, if you want to be exact). If the path is empty, it is implicitly converted to a `/` slash character. If it is a `/` character, it will be treated as `/index.html`.

If you type [http://localhost:3000](`http://localhost:3000`) into your browser's address bar, your server will respond with the contents of the page at `backend/public/index.html`. If there is JavaScript attached to this`index.html` page, and this script makes a request to `"/some-path"`, your browser will:

- Make a request for [http://localhost:3000/some-path](http://localhost:3000/some-path)
- Send a `Referer` header which gives the value of http://localhost:3000/, because that is where the sender page was loaded from.

In the original request for  [http://localhost:3000](`http://localhost:3000`), the browser did not send a `Referer` header giving an origin, because the request came from the browser itself, not from JavaScript within a web page. The request was not being referred from anywhere.

## Requests that don't come from a browser

You don't need to use a browser to make a request from a server. You can use an API platform like [Postman](https://www.postman.com/) or even a simple [`curl`](https://curl.se/docs/tutorial.html) command directly from your Terminal. Try it in a new Terminal window:

```bash-w
$ <b>curl http://localhost:3000/ping</b>

<pre>Connection from:
referer undefined
origin  undefined
ip      ::1
for     http://localhost:3000/ping
at      Tue Nov 19 2024 13:01:21 GMT+0100 (Central European Standard Time)</pre>
```

<details class="tip" open>
<summary>Need to install `curl`?</summary>
If you get a message like `command not found: curl`, you can [install the `curl` program from here](https://help.ubidots.com/en/articles/2165289-learn-how-to-install-run-curl-on-windows-macosx-linux)

</details>

With Postman or `curl`, you _can_ send any `referer` or `origin` header that you want:

```bash-w
$ <b>curl \
-H "Referer: https://not-evil.example.com/" \
-H "Origin: https://pure-good.example.com" \
http://localhost:3000/ping</b>

<pre>Connection from:
referer https://not-evil.example.com/
origin  https://pure-good.example.com
ip      ::1
for     http://localhost:3000/ping
at      Tue Nov 19 2024 13:04:57 GMT+0100 (Central European Standard Time)</pre>   
```

This means that a malevolent actor who has chosen not to use a secure browser can pretend to be connecting from somewhere else.

## Why use authentication tokens?

In other words, your backend must not trust the incoming value for `origin`. What your backend _can_ do is:

* Treat any incoming request for `/` as trustworthy
* Reply to the `/` request with
	* The `index.html` page
	* A signed, encrypted token... 
	* ... that gives a key to the server
	* ... with a short expiry time...
	* ... wrapped in a cookie...
	* ... with the `SameSite` attribute set to `Strict`...
	* ... and the `HttpOnly` attribute set to `true`.
- For any incoming request that has a path other than `/`
	- Check that there is an incoming cookie with the expected signature and values
	- If so: treat the request and respond accordingly
	- If not: respond with a 403 Unauthorized message, if not

<details class="note" open>
<summary>Cookie attributes</summary>
I'll explain what all the token and cookie attributes mean as you are writing the code for them.

</details>

In this way, even if the request does come from a malicious actor using an unorthodox method for making the request, they will only get the same data that they would have received if they had used a reputable browser. It's a bit like giving forgers only what they pay for with real money, even if they are wearing a disguise.

<details class="warn" open>
<summary>Loopholes</summary>
Having said that, there _are_ ways a hacker could inject code into your web pages, if you do not take the right precautions. Your server would respond to such injected code as if it were legitimate. However, the service that you are creating in this tutorial does not open up any of these loopholes, so there's no need to discuss here how to protect your server from them.

</details>
</section>