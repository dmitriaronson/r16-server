import Router from 'koa-router';
import Boom from 'boom';
import nconf from 'nconf';
import Soundcloud from '../lib/services/soundcloud';
import logger from '../lib/services/logger';

const ENV = process.env.NODE_ENV || 'development';

nconf.file({ file: `src/config/${ENV}.json` });

const router = new Router({ prefix: '/api/search' });
const soundcloud = new Soundcloud(nconf.get('SOUNDCLOUD_CLIENT_ID'));

router.get('/', async (ctx) => {
  const q = ctx.query.q;

  try {
    const results = await soundcloud.search(q);
    ctx.body = { data: results };
  } catch (e) {
    logger.error(e.message);

    ctx.status = 400;
    ctx.body = 'Something went wrong';
  }
});

export default router;
