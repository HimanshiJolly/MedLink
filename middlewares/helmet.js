const helmet = require('helmet');

const helmetMiddleware = helmet({
  contentSecurityPolicy: false, // Disable CSP if needed (modify as required)
  crossOriginResourcePolicy: { policy: "same-origin" }, // Adjust based on project needs
});

module.exports = helmetMiddleware;
