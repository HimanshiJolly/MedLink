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
const Appointment = require('./models/appointment');

app.get('/finddoctor', async (req, res) => {
  try {
    const { speciality } = req.query;

    // Build query object with only speciality filter
    const query = {};

    if (speciality) {
      if (Array.isArray(speciality)) {
        query.field = { $in: speciality };
      } else {
        query.field = speciality;
      }
    }

    const doctors = await Doctor.find(query);
    res.render('finddoctor', { req, doctors });
  } catch (err) {
    console.error('Error fetching doctors:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/book-appointment', async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).send('You must be logged in to book an appointment.');
    }

    const { name, email, phone, appointmentDate, timeslot, speciality, doctor, message } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !appointmentDate || !timeslot || !speciality || !doctor) {
      return res.status(400).send('All required fields must be filled.');
    }

    // Check if appointment already exists for the same doctor, date, and timeslot
    const existingAppointment = await Appointment.findOne({
      doctorId: doctor,
      appointmentDate: new Date(appointmentDate),
      timeSlot: timeslot
    });

    if (existingAppointment) {
      return res.status(409).send('This time slot is already booked for the selected doctor.');
    }

    // Create new appointment
    const newAppointment = new Appointment({
      userId: req.session.user._id,
      doctorId: doctor,
      appointmentDate: new Date(appointmentDate),
      timeSlot: timeslot,
      message: message || ''
    });

    await newAppointment.save();

    res.send('Appointment booked successfully!');
  } catch (err) {
    console.error('Error booking appointment:', err);
    res.status(500).send('Internal Server Error');
  }
});
app.get('/Appointment', async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    const selectedDoctorId = req.query.doctorId || null;
    const selectedSpeciality = req.query.speciality || null;
    res.render('Appointment', { req, doctors, selectedDoctorId, selectedSpeciality });
  } catch (err) {
    console.error('Error fetching doctors for appointment:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/booked-timeslots', async (req, res) => {
  try {
    const { doctorId, appointmentDate } = req.query;
    if (!doctorId || !appointmentDate) {
      return res.status(400).json({ error: 'doctorId and appointmentDate are required' });
    }
    const date = new Date(appointmentDate);
    const nextDate = new Date(date);
    nextDate.setDate(date.getDate() + 1);

    const appointments = await Appointment.find({
      doctorId: doctorId,
      appointmentDate: {
        $gte: date,
        $lt: nextDate
      }
    });

    const bookedSlots = appointments.map(app => app.timeSlot);
    res.json({ bookedSlots });
  } catch (err) {
    console.error('Error fetching booked timeslots:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/reset', (req, res) => {
  res.render('reset', { req })
})
app.get('/findhospital', (req, res) => {
  res.render('findHospital', { req });
})
app.get('/profile', (req, res) => {
  res.render('profile', { req });
})
app.get('/emergency', (req, res) => {
  res.render('Emergency', { req });
})
app.get('*', (req, res) => {
  res.status(404).send('Page Not Found')
})

app.use(errorHandler)
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})


