const Koa = require('koa')
const { join } = require('path');
const { connect, initSchemas, initAdmin } = require('./database/init');
const R = require('ramda')
// const MIDDLEWARES = ['common', 'router', 'parcel']
const MIDDLEWARES = ['common', 'router']

const useMiddlewares = app => {
  R.map(
    R.compose(
      R.forEachObjIndexed(initWith => initWith(app)),
      require,
      name => join(__dirname, `./middlewares/${name}`)
    )
  )(MIDDLEWARES)
}

(async () => {
  try {
    await connect();
    await initSchemas();
    await initAdmin()
    const app = new Koa();
    await useMiddlewares(app)
    app.listen(4455)
    // require('./tasks/trailer-list');
    // require('./tasks/video');
    // require('./tasks/api');
    // require('./tasks/qiniu');
    // require('./tasks/upaiyun');
    require('./tasks/upyun1');
    // require('./tasks/upaiyun-process');
  } catch (error) {
    console.log(error)
  }
})();
