import Router from 'koa-router';
import uuid from 'uuid';
import Boom from 'boom';
import passport from 'koa-passport';
import Playlist from '../lib/models/Playlist';
import { validatePlaylist } from '../lib/services/validate';
import logger from '../lib/services/logger';

const router = new Router({ prefix: '/api/playlist' });

router.use(passport.authenticate('jwt', { session: false }));

router.get('/', async (ctx) => {
  const playlists = await Playlist.find({});

  ctx.body = { data: playlists };
});

router.get('/:playlistId', async (ctx) => {
  const id = ctx.params.playlistId;
  const playlist = await Playlist.findOne({ _id: id });

  ctx.body = { data: playlist };
});

router.post('/', async (ctx) => {
  const body = ctx.request.body;

  try {
    await validatePlaylist(body);

    const { title, description, tracks } = body;

    const playlist = new Playlist({
      id: uuid.v4(),
      author: 'ctx.session.passport.user._id',
      title,
      description,
      tracks,
    });

    const reply = await playlist.save();

    ctx.body = { data: reply.id };
  } catch (e) {
    logger.error(e);

    if (e.name === 'ValidationError') {
      ctx.status = 400;
      ctx.body = Boom.badRequest(e.message).output;
    }
  }
});

export default router;
