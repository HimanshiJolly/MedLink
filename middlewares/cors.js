const cors = require('cors');

const corsOptions = {
  origin: '*',  // Allows all origins (change to specific domains if needed)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // If you're using cookies/sessions
};

const allowCors = cors(corsOptions);

module.exports = allowCors;
