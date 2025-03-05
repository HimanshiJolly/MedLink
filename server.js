const express = require(`express`) 
const path = require('path') 
const app = express()
const PORT = 8080
const logger = require('./middlewares/logger') 
const errorHandler = require('./middlewares/errorHandler') 
app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) 
app.use(logger) 
app.use(express.static(path.join(__dirname, 'public')))
const apiRoutes = require('./api/apiRoutes') 
app.use('/api', apiRoutes) 
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'home1.html')) // Serve the login page at root URL
})
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html')) // Serve the dashboard HTML file
})
app.get('/services', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'Services.html')) // Serve the dashboard HTML file
})
// Serve register.html when user needs to register
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'register.html')) // Serve the register HTML file
})
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'Aboutus.html')) // Serve the register HTML file
})
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'contact.html')) // Serve the register HTML file
})
// Use error handler middleware for catching and handling errors
app.use(errorHandler) // Handle errors globally
// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})