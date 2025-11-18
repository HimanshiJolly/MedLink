const mongoose = require('mongoose');
const Doctor = require('../models/doctor');
const fs = require('fs');
const path = require('path');

const mongoURI = 'mongodb://127.0.0.1:27017/Medlink';

async function importDoctors() {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');

    const dataPath = path.join(__dirname, 'doctorData.json');
    const doctorData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    // Clear existing doctors collection
    await Doctor.deleteMany({});
    console.log('Cleared existing doctors');

    // Insert new doctor data
    await Doctor.insertMany(doctorData);
    console.log('Doctor data imported successfully');

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error importing doctor data:', error);
  }
}

// Run the import if this file is executed directly
// Commented out to prevent automatic import since doctors now register themselves
// if (require.main === module) {
//   importDoctors();
// }

module.exports = importDoctors;
