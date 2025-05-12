const mongoose = require('mongoose');

// Define schemas and models for each collection
const ayurvedicSchema = new mongoose.Schema({}, { collection: 'ayurvedic', strict: false });
const sliderImageSchema = new mongoose.Schema({}, { collection: 'sliderImages', strict: false });
const fitnessDealSchema = new mongoose.Schema({}, { collection: 'fitnessDeals', strict: false });
const personalCareSchema = new mongoose.Schema({}, { collection: 'personalCare', strict: false });
const surgicalDealSchema = new mongoose.Schema({}, { collection: 'surgicalDeals', strict: false });
const surgicalDeviceSchema = new mongoose.Schema({}, { collection: 'surgicalDevices', strict: false });

const Ayurvedic = mongoose.model('Medicine', ayurvedicSchema);
const SliderImage = mongoose.model('SliderImage', sliderImageSchema);
const FitnessDeal = mongoose.model('FitnessDeal', fitnessDealSchema);
const PersonalCare = mongoose.model('PersonalCare', personalCareSchema);
const SurgicalDeal = mongoose.model('SurgicalDeal', surgicalDealSchema);
const SurgicalDevice = mongoose.model('SurgicalDevice', surgicalDeviceSchema);

// Async functions to load data from MongoDB collections with debug logging
const loadMedicines = async () => {
  try {
    const data = await Ayurvedic.find({}).lean();
    console.log('Loaded medicines:', data.length);
    return data;
  } catch (err) {
    console.error('Error loading medicines:', err);
    return [];
  }
};

const loadSliderImages = async () => {
  try {
    const data = await SliderImage.find({}).lean();
    console.log('Loaded slider images:', data.length);
    return data;
  } catch (err) {
    console.error('Error loading slider images:', err);
    return [];
  }
};

const loadFitnessDeals = async () => {
  try {
    const data = await FitnessDeal.find({}).lean();
    console.log('Loaded fitness deals:', data.length);
    return data;
  } catch (err) {
    console.error('Error loading fitness deals:', err);
    return [];
  }
};

const loadPersonalCareProducts = async () => {
  try {
    const data = await PersonalCare.find({}).lean();
    console.log('Loaded personal care products:', data.length);
    return data;
  } catch (err) {
    console.error('Error loading personal care products:', err);
    return [];
  }
};

const loadSurgicalDeals = async () => {
  try {
    const data = await SurgicalDeal.find({}).lean();
    console.log('Loaded surgical deals:', data.length);
    return data;
  } catch (err) {
    console.error('Error loading surgical deals:', err);
    return [];
  }
};

const loadSurgicalDevices = async () => {
  try {
    const data = await SurgicalDevice.find({}).lean();
    console.log('Loaded surgical devices:', data.length);
    return data;
  } catch (err) {
    console.error('Error loading surgical devices:', err);
    return [];
  }
};

module.exports = {
  loadMedicines,
  loadSliderImages,
  loadFitnessDeals,
  loadPersonalCareProducts,
  loadSurgicalDeals,
  loadSurgicalDevices
};
