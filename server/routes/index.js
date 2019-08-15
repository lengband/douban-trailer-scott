import Router from 'koa-router';
import { resolve } from 'path';
import glob from 'glob';
import { routerArr } from '../lib/decorator';
import { resolvePath } from '../lib/utils'
import { symbolPrefix } from '../lib/constants';

export class Route {
  constructor (app, apiPath) {
    this.app = app
    this.apiPath = apiPath
    this.router = new Router()
  }
  init () {
    const routerFiles = glob.sync(resolve(this.apiPath, './*.js'))
    routerFiles.forEach(require)
    routerArr.forEach(
      ({ target, method, path, callback }) => {
        const prefixPath = target[symbolPrefix]
        const routerPath = resolvePath(prefixPath + path)
        this.router[method](routerPath, ...callback)
      }
    )
    this.app.use(this.router.routes())
    this.app.use(this.router.allowedMethods())
  }
}