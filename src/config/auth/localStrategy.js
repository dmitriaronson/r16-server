import jwt from 'jsonwebtoken';
import nconf from 'nconf';
import passport from 'koa-passport';
import { Strategy } from 'passport-local';

import User from '../../lib/models/User';

passport.use(new Strategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ username });

    if (!user) {
      throw new Error('User not found');
    }

    const passwordMatch = await user.comparePassword(password);

    if (!passwordMatch) {
      throw new Error('Credentials are incorrect');
    }

    const token = jwt.sign({ id: user._id }, nconf.get('JWT_SECRET'));

    done(null, token);
  } catch (error) {
    done(error, null);
  }
}));
