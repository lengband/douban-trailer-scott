const { Route } = require('../routes/index')
const { resolve } = require('path')

export const router = app => {
  const apiPath = resolve(__dirname, '../routes')
  const instance = new Route(app, apiPath)

  instance.init()
}