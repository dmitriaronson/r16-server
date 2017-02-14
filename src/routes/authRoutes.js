import Router from 'koa-router';
import passport from 'koa-passport';

const router = new Router();

router.get('/auth/google', passport.authenticate('google', { scope: ['email'] }));

router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (ctx) => {
  ctx.redirect('/');
});

export default router;
