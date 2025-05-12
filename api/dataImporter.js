const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// MongoDB connection URI
const mongoURI = 'mongodb://localhost:27017/Medlink'; // Replace with your MongoDB connection string

// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => {
    console.log('MongoDB connected successfully');
    importData();
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Function to read JSON file and parse data
const readJSONFile = (filename) => {
  const filePath = path.join(__dirname, '..', 'data', filename);
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

// Function to import data into a collection
const importCollection = async (collectionName, data) => {
  try {
    const collection = mongoose.connection.collection(collectionName);
    await collection.deleteMany({}); // Clear existing data
    await collection.insertMany(data);
    console.log(`Imported ${data.length} documents into ${collectionName}`);
  } catch (err) {
    console.error(`Error importing data into ${collectionName}:`, err);
  }
};

// Main function to import all data
const importData = async () => {
  await importCollection('ayurvedic', readJSONFile('ayurvedic.json'));
  await importCollection('sliderImages', readJSONFile('sliderImages.json'));
  await importCollection('fitnessDeals', readJSONFile('fitnessDeals.json'));
  await importCollection('personalCare', readJSONFile('personalCare.json'));
  await importCollection('surgicalDeals', readJSONFile('surgicalDeals.json'));
  await importCollection('surgicalDevices', readJSONFile('surgicalDevices.json'));

  console.log('Data import completed');
  mongoose.disconnect();
};
