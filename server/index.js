import Koa from 'koa'
import { join } from 'path';
import R from 'ramda'
import chalk from 'chalk'
import config from '../config'

const MIDDLEWARES = ['database', 'common', 'router', 'parcel']

const useMiddlewares = app => {
  R.map(
    R.compose(
      R.forEachObjIndexed(init => init(app)),
      require,
      name => join(__dirname, `./middlewares/${name}`)
    )
  )(MIDDLEWARES)
}

const start = async () => {
  try {
    const app = new Koa();
    const { port } = config

    await useMiddlewares(app)
    
    app.listen(port, () => {
      console.log(
        process.env.NODE_ENV === 'development'
          ? `Open ${chalk.green(`http://localhost:${port}`)}`
          : `APP listening on porrt ${port}`
      )
    })
    // require('./tasks/trailer-list');
    // require('./tasks/video');
    // require('./tasks/api');
    // require('./tasks/qiniu');
  } catch (error) {
    console.log(error)
  }
}

start()
