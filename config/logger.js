const winston = require('winston');

// Define the log format
const logFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.printf(({ timestamp, level, message }) => {
    return `${timestamp} ${level}: ${message}`;
  })
);

// Create the logger instance
const logger = winston.createLogger({
  level: 'info',
  format: logFormat,
  transports: [
    new winston.transports.Console(), // Console output
    new winston.transports.File({ filename: 'logs/app.log' }), // File output
  ],
});

// Export the logger to be used in other parts of your application
module.exports = logger;



