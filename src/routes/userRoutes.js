import Router from 'koa-router';
import Boom from 'boom';
import nconf from 'nconf';
import jwt from 'jsonwebtoken';
import logger from '../lib/services/logger';
import User from '../lib/models/User';
import { validateUser } from '../lib/services/validate';

const router = new Router({
  prefix: '/api/user',
});

router.post('/', async (ctx) => {
  const body = ctx.request.body;

  try {
    await validateUser(body);

    const { username, password } = body;
    const user = new User({ username, password });

    await user.save();

    const token = jwt.sign({ id: user._id }, nconf.get('JWT_SECRET'));

    ctx.body = { data: token };
  } catch (e) {
    logger.error(e);

    if (e.name === 'ValidationError') {
      ctx.status = 400;
      ctx.body = Boom.badRequest(e.message).output;
    } else {
      ctx.body = e.message;
    }
  }
});

export default router;
