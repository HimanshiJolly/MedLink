const express = require(`express`) 
const path = require('path') 
const app = express()
const PORT = 8080
const logger = require('./middlewares/logger') 
const errorHandler = require('./middlewares/errorHandler') 
const helmet = require('./middlewares/helmet')
const session = require('express-session')
const authMiddleware = require('./middlewares/authMiddleware')
app.use(session({
  secret: '567890', 
  resave: false,
  saveUninitialized: true,
}))
const {morganLogger, devLogger} = require('./middlewares/morgan')
app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) 
app.use(logger)
app.use(express.static(path.join(__dirname, 'public')))
app.use(morganLogger)
app.use(devLogger)
app.use(authMiddleware) 
const apiRoutes = require('./api/apiRoutes') 
app.use('/api', apiRoutes) 
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'home1.html')) 
})
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html')) 
})
app.get('/services', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'Services.html')) 
})
app.get('/pharmacy', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'medicine.html')) 
})
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'register.html')) 
})
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'Aboutus.html')) 
})
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'contact.html')) 
})

app.get('/finddoctor', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'Find.html')) 
})
app.get('/Appointment', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'Appointment.html')) 
})

app.get('/findhospital', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'findhospital.html')) 
})
app.use(errorHandler) 
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})