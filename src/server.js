import Koa from 'koa';
import nconf from 'nconf';
import passport from 'koa-passport';
import bodyparser from 'koa-bodyparser';
import logger from './lib/services/logger';
import authRoutes from './routes/authRoutes';
import searchRoutes from './routes/searchRoutes';
import userRoutes from './routes/userRoutes';
import playlistRoutes from './routes/playlistRoutes';

const ENV = process.env.NODE_ENV || 'development';

nconf.argv().env().file({ file: `src/config/env/${ENV}.json` });

const app = new Koa();
const PORT = nconf.get('PORT');

app.keys = [nconf.get('SESSION_SECRET')];

app.use(bodyparser());
app.use(passport.initialize());
app.use(authRoutes.routes());
app.use(searchRoutes.routes());
app.use(userRoutes.routes());
app.use(playlistRoutes.routes());

require('./config/auth/localStrategy');
require('./config/auth/googleStrategy');
require('./config/auth/jwtStrategy');
require('./lib/services/db');

app.listen(PORT, () => logger.info(`Listening on port ${PORT}`));
