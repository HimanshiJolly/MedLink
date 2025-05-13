const express = require('express')
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
app.use(compression())
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
} = require('./api/dataLoader')

app.use('/api', apiRoutes)
app.get('/', (req, res) => {
  res.render('home1',{ req })
});
app.get('/login', (req, res) => {
  res.render('login', { req })
})
app.get('/services', (req, res) => {
 res.render('Services',{req}) 
})
app.get('/pharmacy', async (req, res) => {
  try {
    const medicines = await loadMedicines()
    const sliderImages = await loadSliderImages()
    const fitnessDeals = await loadFitnessDeals()
    const personalCareProducts = await loadPersonalCareProducts()
    const surgicalDeals = await loadSurgicalDeals()
    const surgicalDevices = await loadSurgicalDevices()

    res.render('medicine', {
      title: 'MedLink - Medicine Page',
      medicines,
      sliderImages,
      fitnessDeals,
      personalCareProducts,
      surgicalDeals,
      surgicalDevices,
      req
    })
  } catch (err) {
    console.error('Error loading pharmacy data:', err)
    res.status(500).send('Internal Server Error')
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
app.get('/register', (req, res) => {
  res.render('register', { req })
})
app.get('/about', (req, res) => {
  res.render('Aboutus', { req })
})
app.get('/contact', (req, res) => {
  res.render('contact',{req})
})
app.get('/Appointment', (req, res) => {
  res.render('Appointment', { req })
})
app.get('/reset', (req, res) => {
  res.render('reset', { req })
})
app.get('/findhospital', (req, res) => {
  res.render('findHospital', { req })
})
const Doctor = require('./models/doctor');

const Appointment = require('./models/appointment')

app.get('/finddoctor', async (req, res) => {
  try {
    const { search, speciality, qualification } = req.query
    const query = {};
    if (search) {
      query.name = { $regex: search, $options: 'i' }
    }
    if (speciality) {
      if (Array.isArray(speciality)) {
        query.field = { $in: speciality }
      } else {
        query.field = speciality
      }
    }
    if (qualification) {
      if (Array.isArray(qualification)) {
        query.qualification = { $in: qualification }
      } else {
        query.qualification = qualification
      }
    }
    const doctors = await Doctor.find(query)
    const possibleTimeslots = [];
    const startHour = 9
    const endHour = 17
    const today = new Date()
    today.setMinutes(0, 0, 0)

    for (let hour = startHour; hour < endHour; hour++) {
      const slot = new Date(today)
      slot.setHours(hour)
      possibleTimeslots.push(slot)
    }

    const doctorsWithTimeslots = await Promise.all(doctors.map(async (doctor) => {
      const bookedAppointments = await Appointment.find({ doctor: doctor._id })
      const bookedTimes = bookedAppointments.map(app => app.timeslot.getTime())

      const availableTimeslots = possibleTimeslots.filter(slot => !bookedTimes.includes(slot.getTime()))

      return {
        ...doctor.toObject(),
        availableTimeslots
      }
    }))

    res.render('finddoctor', { req, doctors: doctorsWithTimeslots })
  } catch (err) {
    console.error('Error fetching doctors:', err)
    res.status(500).send('Internal Server Error')
  }
});
app.get('/profile', (req, res) => {
  res.render('profile', { req })
})
app.get('/emergency', (req, res) => {
  res.render('Emergency', { req })
})
app.get('*', (req, res) => {
  res.status(404).send('Page Not Found')
})
app.use(errorHandler)
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})