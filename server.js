const express = require('express')
const path = require('path')
const mongoose = require('mongoose')

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

const mongoURI = 'mongodb://127.0.0.1:27017/Medlink'; 
mongoose.connect(mongoURI)
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.error('MongoDB connection error:', err))

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
app.get('/pharmacy', async (req, res) => {
  try {
    const medicines = await loadMedicines();
    const sliderImages = await loadSliderImages();
    const fitnessDeals = await loadFitnessDeals();
    const personalCareProducts = await loadPersonalCareProducts();
    const surgicalDeals = await loadSurgicalDeals();
    const surgicalDevices = await loadSurgicalDevices();

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
  } catch (err) {
    console.error('Error loading pharmacy data:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/cart', (req, res) => {
  res.render('medcart', { req })
})

app.get('/order-by-prescription', (req, res) => {
  res.render('orderByPrescription', { req })
})

app.get('/payment', (req, res) => {
  res.render('payment', { req });
});

app.post('/payment/complete', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'User not logged in' });
  }
  // Payment processing logic can be added here
  // For now, just respond with success
  res.status(200).send('Payment completed');
});

app.get('/register', (req, res) => {
  res.render('register', { req })
})
app.get('/about', (req, res) => {
  res.render('Aboutus', { req })
})
app.get('/contact', (req, res) => {
  res.render('contact',{req})
})
const Doctor = require('./models/doctor');

app.get('/finddoctor', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.render('finddoctor', { req, doctors });
  } catch (err) {
    console.error('Error fetching doctors:', err);
    res.status(500).send('Internal Server Error');
  }
});
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


