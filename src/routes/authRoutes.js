import Router from 'koa-router';
import Boom from 'boom';
import passport from 'koa-passport';

const router = new Router();

router.post('/auth/login', async (ctx, next) => {
  try {
    await passport.authenticate('local', async (err, token) => {
      if (err) {
        throw err;
      }

      ctx.body = { data: token };
    })(ctx, next);
  } catch (error) {
    ctx.status = 401;
    ctx.body = Boom.unauthorized(error.message).output;
  }
});

router.get('/auth/google', passport.authenticate('google', { scope: ['email'] }));

router.get('/auth/google/callback', async (ctx, next) => {
  await passport.authenticate('google', async (err, token) => {
    if (err) {
      await next(err);
    }

    ctx.body = token;
  })(ctx, next);
});

export default router;
