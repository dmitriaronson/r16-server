import Koa from 'koa';
import Router from 'koa-router';
import serve from 'koa-static';
import send from 'koa-send';
import bodyparser from 'koa-bodyparser';
import Boom from 'boom';
import logger from './lib/services/logger';
import id from './lib/services/id';
import Pattern from './lib/models/Pattern';
import constant from './config/constants';

const PORT = constant('PORT');
const app = new Koa();
const router = new Router();

app.use(serve(`${__dirname}/public`));

router.get('/pattern/:id', async (ctx) => {
  try {
    const result = await Pattern.findOne({ id: ctx.params.id });
    let pattern = [];
    let tempo = null;

    if (result) {
      pattern = result.pattern;
      tempo = result.tempo;
    }

    ctx.body = { data: { channels: pattern, tempo } };
  } catch (error) {
    ctx.status = 400;
    ctx.body = Boom.badRequest(error.message).output;
  }
});

router.post('/pattern', async (ctx) => {
  try {
    const body = ctx.request.body.data;
    const { channels, tempo } = body;
    const pattern = new Pattern({ id: id(), tempo, pattern: channels });

    await pattern.save();

    ctx.body = { data: pattern.id };
  } catch (error) {
    ctx.status = 400;
    ctx.body = Boom.badRequest(error.message).output;
  }
});

router.get('*', async (ctx) => {
  await send(ctx, 'index.html', { root: `${__dirname}/public` });
});

app.use(bodyparser());
app.use(router.routes());

require('./lib/services/db');

app.listen(PORT, () => logger.info(`Listening on port ${PORT}`));
