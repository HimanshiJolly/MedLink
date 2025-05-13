const mongoose = require('mongoose');
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Medlink');
}
const doctorSchema = new mongoose.Schema({
  img: { type: String, required: true },
  name: { type: String, required: true },
  field: { type: String, required: true },
  experience: { type: String, required: true },
  qualification: { type: String, required: true },
  rating: { type: Number, required: true }
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
