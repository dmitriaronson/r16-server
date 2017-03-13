import mongoose from 'mongoose';
import logger from './logger';
import getConstant from '../../config/constants';

const db = mongoose.connection;

mongoose.Promise = global.Promise;

db.on('error', error => logger.error(error));
db.on('close', () => logger.info('Database connection closed.'));
db.once('open', () => logger.info(`Connected to ${getConstant('DB_URI')}`));

mongoose.connect(getConstant('DB_URI'));
