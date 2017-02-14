import nconf from 'nconf';
import mongoose from 'mongoose';
import logger from './logger';

const db = mongoose.connection;

mongoose.Promise = global.Promise;

db.on('error', error => logger.error(error));
db.on('close', () => logger.info('Database connection closed.'));
db.once('open', () => logger.info(`Connected to ${nconf.get('DB_URI')}`));

mongoose.connect(nconf.get('DB_URI'));
