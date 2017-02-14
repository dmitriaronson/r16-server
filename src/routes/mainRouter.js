import Router from 'koa-router';
import checkAuth from '../lib/middleware/checkAuth';

const router = new Router();

router.get('/', checkAuth, (ctx) => {
  ctx.body = 'Hello World!';
});

export default router;
