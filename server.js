const express = require(`express`)
const path = require('path')
const app = express()
app.set("view engine", "ejs")
const PORT = 8080
const logger = require('./middlewares/logger')
const errorHandler = require('./middlewares/errorHandler')
const allowCors = require('./middlewares/cors')
const session = require('express-session')
const helmetMiddleware = require('./middlewares/helmet')
app.use(session({
  secret: '945138',
  resave: false,
  saveUninitialized: false,
}))
const compression = require('compression')
const { morganLogger, devLogger } = require('./middlewares/morgan')


app.use(compression());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(logger)
app.use(express.static(path.join(__dirname, 'public')))
app.use(allowCors);
app.use(helmetMiddleware);
app.use(morganLogger)
app.use(devLogger)

const apiRoutes = require('./api/apiRoutes')
const {
  loadMedicines,
  loadSliderImages,
  loadFitnessDeals,
  loadPersonalCareProducts,
  loadSurgicalDeals,
  loadSurgicalDevices
} = require('./api/dataLoader');

app.use('/api', apiRoutes)
app.get('/', (req, res) => {
  res.render('home1',{ req });
});
app.get('/login', (req, res) => {
  res.render('login', { req })
})
app.get('/services', (req, res) => {
 res.render('Services',{req}) 
})
app.get('/pharmacy', (req, res) => {
  const medicines = loadMedicines(); 
  const sliderImages = loadSliderImages(); 
  const fitnessDeals = loadFitnessDeals();
  const personalCareProducts = loadPersonalCareProducts();
  const surgicalDeals = loadSurgicalDeals();
  const surgicalDevices = loadSurgicalDevices();

  res.render('medicine', {
    title: 'MedLink - Medicine Page',
    medicines,
    sliderImages,
    fitnessDeals,
    personalCareProducts,
    surgicalDeals,
    surgicalDevices,
    req
  });
});

app.get('/cart', (req, res) => {
  res.render('medcart', { req })
})

app.get('/register', (req, res) => {
  res.render('register', { req })
})
app.get('/about', (req, res) => {
  res.render('Aboutus', { req })
})
app.get('/contact', (req, res) => {
  res.render('contact',{req})
})
app.get('/finddoctor', (req, res) => {
  res.render('finddoctor', { req });
})
app.get('/Appointment', (req, res) => {
  res.render('Appointment', { req })
})
app.get('/reset', (req, res) => {
  res.render('reset', { req })
})
app.get('/findhospital', (req, res) => {
  res.render('findHospital', { req });
})
app.get('*', (req, res) => {
  res.status(404).send('Page Not Found')
})
app.use(errorHandler)
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})


