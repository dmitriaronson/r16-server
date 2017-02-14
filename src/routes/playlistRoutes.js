import Router from 'koa-router';

const router = new Router({ prefix: '/p' });

router.get('/:playlistId', (ctx) => {
  ctx.body = 'Hello World!';
});

router.post('/new', (ctx) => {

});

router.put('/:playlistId', function (ctx) {

});

router.del('/:playlistId', function (ctx) {

});

export default router;
