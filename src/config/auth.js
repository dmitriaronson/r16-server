import nconf from 'nconf';
import passport from 'koa-passport';
import { OAuth2Strategy } from 'passport-google-oauth';

import User from '../lib/models/User';

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

passport.use(new OAuth2Strategy({
  clientID: nconf.get('GOOGLE_CLIENT_ID'),
  clientSecret: nconf.get('GOOGLE_CLIENT_SECRET'),
  callbackURL: `${nconf.get('APP_HOST')}/auth/google/callback`,
}, (accessToken, refreshToken, profile, done) => {
  User.findOrCreate({ googleId: profile.id }, (err, user) => done(err, user));
}));
