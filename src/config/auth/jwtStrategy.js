import nconf from 'nconf';
import passport from 'koa-passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

import User from '../../lib/models/User';

passport.use(new Strategy({
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: nconf.get('JWT_SECRET'),
}, async (jwt, done) => {
  try {
    const user = await User.findOne({ _id: jwt.id });
    done(null, user);
  } catch (error) {
    done(error, false);
  }
}));
