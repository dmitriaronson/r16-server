import Koa from 'koa';
import nconf from 'nconf';
import passport from 'koa-passport';
import session from 'koa-generic-session';
import convert from 'koa-convert';
import bodyparser from 'koa-bodyparser';
import MongoStore from 'koa-generic-session-mongo';
import logger from './lib/services/logger';
import mainRoutes from './routes/mainRoutes';
import authRoutes from './routes/authRoutes';
import searchRoutes from './routes/searchRoutes';
import playlistRoutes from './routes/playlistRoutes';

const ENV = process.env.NODE_ENV || 'development';

nconf.argv().env().file({ file: `src/config/${ENV}.json` });

const app = new Koa();
const PORT = nconf.get('PORT');

app.keys = [nconf.get('SESSION_SECRET')];

app.use(convert(session({
  store: new MongoStore(),
})));
app.use(bodyparser());
app.use(passport.initialize());
app.use(passport.session());
app.use(mainRoutes.routes());
app.use(authRoutes.routes());
app.use(searchRoutes.routes());
app.use(playlistRoutes.routes());

require('./config/auth');
require('./lib/services/db');

app.listen(PORT, () => logger.info(`Listening on port ${PORT}`));
