<h1> Adding authentication using passport.js </h1>

<h2>Passport.JS</h2>
<ul>
<li>It is a middleware that handles authentication using different strategies.</li>
<li>Strategies are like smaller middleware that connect to the larger passport middleware.</li><li>It uses various things such as cookies, session management, session storage, retrieval of data and everything.All of which work in sync in order to provide the overall authentication system.</li><li>In this repo,I have used the local strategin passport JS.</li></ul>

<h3>Info about the project</h3>
<ul><li>Here, I used the local strategy and the MVC model in the project.</li>
    <li>I have had a login page, a sign up page.There is also protected page that you can access only when you are authenticated.</li><li>If you try to access the protected page without being authenticated by entering the URL, you won't be allowed to, and you will be redirected into the login or the sign up page.</li>

</ul>
<p>For the storage of data and the session storage, I have used the local mognoDb.
</p>
<ul>
    <li>There is a server.js file that holds all the basic backbones.</li><li>In the config folder, I have configured the database connection and the passport JS.</li><li>The routes holds the route handling and the controllers holds the controllers for various routes.</li><li>The utilis folder has the utilities. For passport js, which are custom made by me, they are used to generate hash and verify user by comparing hash.</li><li> And finally the views folder has all the ejs.</li>
</ul>