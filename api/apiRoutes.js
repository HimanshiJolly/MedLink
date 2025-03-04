const express = require('express') // Express for routing
const path = require('path') // Path to handle file paths
const fs = require('fs') // FS module for reading and writing files
const router = express.Router() // Create an instance of Express Router

// Login route
router.post('/login', (req, res, next) => {
  const { username, password } = req.body; // Remove loggedIn from destructuring

fs.readFile(path.join(__dirname, '../models/users.json'), 'utf-8', (err, data) => {
  if (err) return next(err);

  try {
    const users = JSON.parse(data);
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      // Successful login: Redirect with loggedIn=true
      return res.status(302).redirect(`/?loggedIn=true&username=${user.username}`);
    } else {
      // Failed login: Redirect to register (or login) with error message (optional)
      return res.status(302).redirect('/register?error=InvalidCredentials');
    }
  } catch (parseError) {
    return next(parseError);
  }
});
})
router.get('/', (req, res) => {
  const username = req.query.username; // Extract username from the query string
  if (!username) {
    // If no username, redirect to login page
    return res.redirect('/login');
  }

  // Serve the home1.html file
  res.sendFile(path.join(__dirname, 'views', 'home1.html')); // Make sure the path to home1.html is correct
});

// Register route
router.post('/register', (req, res, next) => {
  const { username, password } = req.body // Destructure username and password
  const newUser = { username, password } // Create a new user object
  // Read users data from the users.json file
  fs.readFile(path.join(__dirname, '../models/users.json'), 'utf-8', (err, data) => {
    if (err) return next(err) // Pass any error to the error handling middleware
    let users = []
    if (data) {
      users = JSON.parse(data) // Parse existing user data
    }
    users.push(newUser) // Add the new user to the users array
    // Write the updated users array back to the JSON file
    fs.writeFile(path.join(__dirname, '../models/users.json'), JSON.stringify(users, null, 2), (err) => {
      if (err) return next(err) // Pass any error to the error handling middleware
      res.status(302).redirect('/') // Redirect to login page after successful registration
    })
  })
})

module.exports = router // Export the router so it can be used in server.js