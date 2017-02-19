import nconf from 'nconf';
import passport from 'koa-passport';
import { OAuth2Strategy } from 'passport-google-oauth';
import jwt from 'jsonwebtoken';

import User from '../../lib/models/User';

passport.use(new OAuth2Strategy({
  clientID: nconf.get('GOOGLE_CLIENT_ID'),
  clientSecret: nconf.get('GOOGLE_CLIENT_SECRET'),
  callbackURL: `${nconf.get('APP_HOST')}/auth/google/callback`,
}, async (accessToken, refreshToken, profile, done) => {
  const userProfile = { id: profile.id };
  const token = jwt.sign(userProfile, nconf.get('JWT_SECRET'));

  let user = await User.findOne(userProfile);

  if (!user) {
    user = new User(userProfile);
  }

  user.token = token;

  await user.save();

  done(null, token);
}));
