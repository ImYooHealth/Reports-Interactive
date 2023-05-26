const express = require('express');
const session = require('express-session');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true,
}));

// Basic authentication middleware
function authenticate(req, res, next) {
  if (req.session.authenticated) {
    next();
  } else {
    res.sendStatus(401);
  }
}

// Read valid credentials from a local JSON file
function readCredentials() {
  const credentialsPath = path.join(__dirname, 'credentials.json');
  const data = fs.readFileSync(credentialsPath);
  return JSON.parse(data);
}

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const credentials = readCredentials();
  console.log('Credentials, username, credentials[username], password')
  console.log(credentials)
  console.log(username)
  console.log(credentials[username])
  console.log(password)

  if (credentials[username] === password) {
    req.session.authenticated = true;
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

// Logout endpoint
app.post('/logout', (req, res) => {
  req.session.destroy();
  res.sendStatus(200);
});

// Serve the directory if authenticated
app.use(authenticate, express.static('public'));

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

