// Do all the imports
const express = require("express");
const cookie_parser = require("cookie-parser");
const body_parser = require("body-parser");
const passport = require("passport");
const Passport_Strategy = require("passport-local").Strategy;
const express_session = require("express-session");
const http = require("http");
const path = require("path");
const fs = require("fs");

// Define the functions we'll be using
function readCreds() {
    try {
        const data = fs.readFileSync('credentials.json')
        const creds = JSON.parse(data)
        return creds
        //return creds[email] == password
    } catch(err) {
        console.error("Error reading credentials file.")
    }
}

// The function that will be called by the passport middleware upon a 
// login request
function authenticate(username_hash, password_hash, callback) {
    if(readCreds()[username_hash] == password_hash) {
        return callback(null, {
            "username_hash": username_hash
        })
    } else {
        return callback(null)
    }
}

// This function checks if a request is authenticated
var is_authenticated = function(request, response, next) {

  // If the user is authenticated, pass along to the next middleware
  if(request.isAuthenticated()) {
    return next();
  }

  // Otherwise, we abort!
  else {
    console.log("OMG Y U ACCESS THIS, CLICKY THE BUTTONS");
    response.redirect("/");
  }
};

// The function to run once the server has launched and is listening
function on_listening() {
  console.log("Server listening on " + 3050);
};

// A function that maps a user object to a token (string). For cookies
function serialize_user(user, callback) {

  if(user === undefined || user === null || !("username_hash" in user)) {
    callback(null);
  }
  else {
    callback(null, user["username_hash"]);
  }
}

// A function that maps a user token back to a full user object. For cookies
function deserialize_user(username_hash, callback) {
    const user = readCreds()[username_hash]
    if(user) {
        callback(null, user)
    } else {
        callback(null)
    }
}

// Get data
function get_data(request, response) {
  console.log(request.user);

  // Get the username_hash

  const username_hash = request.user["username_hash"];
  const file_path = `data/${username_hash}.json`;

  json_string = fs.readFileSync(file_path);
  json = JSON.parse(json_string);

  response.json(json);
}


// Configure passport authentication
passport.use(new Passport_Strategy(authenticate));
passport.serializeUser(serialize_user);
passport.deserializeUser(deserialize_user);


// Initialize the Express.js app
var app = express();

// Set up the session store parameters
app.use(express_session({
  secret: "some-string-of-random-words-or-smth",
  saveUninitialized: true,
  resave: true
}));

// Enable cookie and json body parsing
app.use(cookie_parser());
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));

// Tell the app to use passport authentication
app.use(passport.initialize());
app.use(passport.session());


// Set up routes. Note: the order of routes matters. When a request comes in,
// it will trigger the first route that matches the given URL and request
// type (GET, POST, etc.)

// First, set up our static routes. Everything in the "public" folder is always
// accessible, even to unauthenticated users
app.use(express.static(path.join(__dirname, "public")));

// The dashboard directory is exposed only to authenticated user. We do this by
// adding the is_authenticated middleware function
app.use("/dashboard",
  is_authenticated,
  express.static(path.join(__dirname, "dashboard"))
);


// Set up our dynamic routes. Let's start with login. If login fails, return 
// error code 401
app.post("/login", function(request, response, next) {

  passport.authenticate("local", function(error, user, info) {

    if(error) {
      return next(error);
    }
    if(!user) {
      return response.status(401).json({ message: "Invalid credentials."});
    }

    request.login(user, function(error) {
      if(error) {
        return next(error);
      }

      return response.json({ message: "Login successful" })
    })

  })(request, response, next);

});

// Logout route
app.get("/logout", function(request, response) {
  request.logout();
  response.redirect('/');
});

// An example data route
app.get("/data", is_authenticated, get_data);

// A final endpoint that catches all requests that haven't been handled by any
// preceding routes
app.use(function(request, response, next) {
  console.log("Attempted to access invalid URL, '" + request.url + "'");
  response.status(404).send("Not Found");
});

server = http.createServer(app);
server.listen(3050);
server.on("listening", on_listening);