const Koa = require('koa')
const { join } = require('path');
const { connect, initSchemas, initAdmin } = require('./database/init');
const R = require('ramda')
const MIDDLEWARES = ['common', 'router', 'parcel']

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
    initSchemas();
    await initAdmin()
    const app = new Koa();
    await useMiddlewares(app)
    app.listen(4455)
    // require('./tasks/qiniu');
    // require('./tasks/api');
    // require('./tasks/qiniu');
  } catch (error) {
    console.log(error)
  }
})();
