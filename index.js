const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const send = require('koa-send');
const bodyparser = require('koa-bodyparser');
const uuidv4 = require('uuid/v4');
const Boom = require('boom');
const logger = require('./lib/services/logger');
const Pattern = require('./lib/models/Pattern');
const constant = require('./config/constants');

const PORT = constant('PORT');
const app = new Koa();
const router = new Router();

app.use(serve(`${__dirname}/public`));

router.get('/pattern', async (ctx) => {
  try {
    const result = await Pattern.find({}, 'pattern id');
    ctx.body = { data: result || [] };
  } catch (error) {
    ctx.status = 400;
    ctx.body = Boom.badRequest(error.message).output;
  }
});

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
    const pattern = new Pattern({ id: uuidv4(), tempo, pattern: channels });

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
