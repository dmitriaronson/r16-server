const mongoose = require('mongoose');
const logger = require('./logger');
const getConstant = require('../../config/constants');

const db = mongoose.connection;

mongoose.Promise = global.Promise;

db.on('error', error => logger.error(error));
db.on('close', () => logger.info('Database connection closed.'));
db.once('open', () => logger.info(`Connected to ${getConstant('DB_URI')}`));

mongoose.connect(getConstant('DB_URI'), { useNewUrlParser: true })
        .catch(e => logger.error(e));
