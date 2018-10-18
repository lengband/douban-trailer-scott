const Koa = require('koa')
const mongoose = require('mongoose')
const views = require('koa-views')
const { resolve, join } = require('path');
const { connect, initSchemas } = require('./database/init');
const R = require('ramda')
const MIDDLEWARES = ['router']

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
    // await initAdmin()
    const app = new Koa();
    await useMiddlewares(app)
    app.listen(4455)
    // require('./tasks/movie');
    require('./tasks/api');
  } catch (error) {
    console.log(error)
  }
})();
