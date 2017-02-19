import Router from 'koa-router';
import passport from 'koa-passport';
import Boom from 'boom';
import nconf from 'nconf';
import Soundcloud from '../lib/services/soundcloud';
import Youtube from '../lib/services/youtube';
import logger from '../lib/services/logger';

const router = new Router({ prefix: '/api/search' });

router.use(passport.authenticate('jwt', { session: false }));

router.get('/', async (ctx) => {
  const q = ctx.query.q;

  try {
    const soundcloud = new Soundcloud(nconf.get('SOUNDCLOUD_CLIENT_ID'));
    const youtube = new Youtube(nconf.get('YOUTUBE_KEY'));
    const results = await [soundcloud.search(q), youtube.search(q)];

    ctx.body = { data: results };
  } catch (e) {
    logger.error(e);

    ctx.status = 400;
    ctx.body = 'Something went wrong';
  }
});

export default router;
