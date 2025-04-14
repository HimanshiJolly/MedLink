const fs = require('fs');
const path = require('path');

const loadJSON = (filename) => {
  try {
    const data = fs.readFileSync(path.join(__dirname, '..', 'data', filename), 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error loading ${filename}:`, err);
    return [];
  }
};

const loadMedicines = () => loadJSON('ayurvedic.json');
const loadSliderImages = () => loadJSON('sliderImages.json');
const loadFitnessDeals = () => loadJSON('fitnessDeals.json');
const loadPersonalCareProducts = () => loadJSON('personalCare.json');
const loadSurgicalDeals = () => loadJSON('surgicalDeals.json');
const loadSurgicalDevices = () => loadJSON('surgicalDevices.json');

module.exports = {
  loadMedicines,
  loadSliderImages,
  loadFitnessDeals,
  loadPersonalCareProducts,
  loadSurgicalDeals,
  loadSurgicalDevices
};
