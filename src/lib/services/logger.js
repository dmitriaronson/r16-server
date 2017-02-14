const winston = require('winston');

const transports = [new (winston.transports.Console)()];

if (process.NODE_ENV === 'production') {
  transports.push(new (winston.transports.File)({ filename: 'debug.log' }));
}

const logger = new (winston.Logger)({ transports });

export default logger;
