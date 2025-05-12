const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  username: { type: String, required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  timeslot: { type: Date, required: true }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
