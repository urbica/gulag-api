const Router = require('koa-router');
const multer = require('koa-multer');
const Photo = require('./photo.model');

const router = new Router();

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, './photos'),
    filename: (req, file, cb) =>
      cb(null, file.originalname.replace(/\.([^.]*)$/, `-${Date.now()}.$1`))
  })
});

router.post('/', upload.any(), async (ctx) => {
  const attributes = ctx.req.body;
  const { path } = ctx.req.files[0];

  const photo = await Photo.create({ ...attributes, path });

  ctx.body = photo;
});

module.exports = router;
