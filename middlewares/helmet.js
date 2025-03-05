const express = require('express');
const helmet = require('helmet');

const app = express();

// Use Helmet middleware
app.use(helmet());

app.get('/', (req, res) => {
  res.send('Helmet is now securing your website!');
});

app.listen(3000, () => console.log('Server running on port 3000'));
