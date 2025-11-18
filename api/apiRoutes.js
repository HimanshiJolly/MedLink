const express = require('express')
const path = require('path')
const fs = require('fs')
const Doctor = require('../models/doctor')
const Appointment = require('../models/appointment')
const router = express.Router()

const user=require('../models/user')

router.post('/login', async(req, res, next) => {
  let { username, password } = req.body

  try {
    let foundUser = await user.findOne({ username, password }).exec()
    if (foundUser) {
      req.session.user = { username: foundUser.username, name: foundUser.name }
      return res.redirect('/')
    } else {
      return res.redirect('/register')
    }
  } catch (err) {
    return next(err)
  }
});

router.post('/register', async(req, res, next) => {
  let { name, username, email, password } = req.body

  try {
    const usernameExists = await user.findOne({ username }).exec()
    if (usernameExists) {
      return res.status(404).redirect('/register?error=UsernameTaken')
    }
    if (password.length < 8) {
      return res.status(400).redirect('/register?error=Length')
    }

    await user.insertOne({ name, username, email, password });

    req.session.user = { username: username, name: name }
    res.redirect('/')
  } catch (err) {
    return next(err)
  }
})

router.get('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      return next(err)
    }
    res.redirect('/')
  })
})

const User = require('../models/user');

router.get('/user', async (req, res) => {
  if (req.session && req.session.user) {
    try {
      let userData = await User.findOne({ name: req.session.user.name }).select('name username email').exec();
      if (userData) {
        res.json({ user: userData });
      } else {
        res.json({ user: null });
      }
    } catch (err) {
      console.error('Error fetching user data:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.json({ user: null });
  }
});
router.post('/reset', async(req, res, next) => {
  let { email, newPassword, confirmPassword } = req.body
  if (newPassword !== confirmPassword) {
    return res.redirect('/reset?error=PasswordMismatch')
  }
  if (newPassword.length < 8) {
    return res.redirect('/reset?error=Length')
  }

  try {
    let foundUser= await user.findOne({ email }).exec()
    if (!foundUser) {
      return res.redirect('/reset?error=UserNotFound')
    }
    foundUser.password = newPassword
    await foundUser.save()
    res.redirect('/login')
  } catch (err) {
    return next(err)
  }
});

router.post('/doctor/login', async(req, res, next) => {
  let { username, password } = req.body

  try {
    let foundDoctor = await Doctor.findOne({ username, password }).exec()
    if (foundDoctor) {
      req.session.doctor = { username: foundDoctor.username, name: foundDoctor.name, id: foundDoctor._id }
      return res.redirect('/')
    } else {
      return res.redirect('/doctorlogin')
    }
  } catch (err) {
    return next(err)
  }
});

router.post('/doctor/register', async(req, res, next) => {
  let { name, username, email, password, field, qualification, experience, location } = req.body

  try {
    const usernameExists = await Doctor.findOne({ username }).exec()
    if (usernameExists) {
      return res.status(404).redirect('/doctorregister?error=UsernameTaken')
    }
    if (password.length < 8) {
      return res.status(400).redirect('/doctorregister?error=Length')
    }

    const newDoctor = new Doctor({
      name,
      username,
      email,
      password,
      field,
      qualification,
      experience,
      location,
      img: '/images/doctor.jpg', // Default image
      rating: 5.0 // Default rating
    });

    await newDoctor.save();

    req.session.doctor = { username: username, name: name, id: newDoctor._id }
    res.redirect('/')
  } catch (err) {
    return next(err)
  }
});

router.post('/doctor/update', async(req, res, next) => {
  if (!req.session || !req.session.doctor) {
    return res.status(401).send('Doctor not logged in');
  }

  try {
    const { name, email, field, qualification, experience, location, rating } = req.body;
    const doctorId = req.session.doctor.id;

    await Doctor.findByIdAndUpdate(doctorId, {
      name,
      email,
      field,
      qualification,
      experience,
      location,
      rating: parseFloat(rating)
    });

    res.redirect('/doctorprofile');
  } catch (err) {
    return next(err);
  }
});


router.get('/doctors', async (req, res, next) => {
  try {
    const doctors = await Doctor.find()
    res.json(doctors)
  } catch (err) {
    next(err)
  }
})

router.get('/doctorsBySpecialty', async (req, res, next) => {
  try {
    const { specialty, date } = req.query;
    if (!specialty) {
      return res.status(400).json({ error: 'Specialty query parameter is required' });
    }
    if (!date) {
      return res.status(400).json({ error: 'Date query parameter is required' });
    }

    // Parse the date parameter to a Date object representing the start of the day
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);

    // Find doctors by specialty
    const doctors = await Doctor.find({ field: specialty });

    // Define possible timeslots for the selected date (example: 9am to 5pm every hour)
    const possibleTimeslots = [];
    const startHour = 9;
    const endHour = 17;

    for (let hour = startHour; hour < endHour; hour++) {
      const slot = new Date(selectedDate);
      slot.setHours(hour);
      possibleTimeslots.push(slot);
    }

    // For each doctor, find booked timeslots on the selected date and calculate available timeslots
    const doctorsWithTimeslots = await Promise.all(doctors.map(async (doctor) => {
      // Find appointments for this doctor on the selected date
      const startOfDay = new Date(selectedDate);
      const endOfDay = new Date(selectedDate);
      endOfDay.setHours(23, 59, 59, 999);

      const bookedAppointments = await Appointment.find({
        doctor: doctor._id,
        timeslot: { $gte: startOfDay, $lte: endOfDay }
      });

      const bookedTimes = bookedAppointments.map(app => app.timeslot.getTime());

      const availableTimeslots = possibleTimeslots.filter(slot => !bookedTimes.includes(slot.getTime()));

      return {
        ...doctor.toObject(),
        availableTimeslots
      };
    }));

    res.json(doctorsWithTimeslots);
  } catch (err) {
    next(err);
  }
});

router.get('/appointments', async (req, res, next) => {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ error: 'User not logged in' });
  }
  try {
    const username = req.session.user.username;
    const appointments = await Appointment.find({ username }).populate('doctor').exec();

    const formattedAppointments = appointments.map(app => ({
      doctorName: app.doctor.name,
      specialty: app.doctor.field,
      timeslot: app.timeslot
    }));

    res.json(formattedAppointments);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
