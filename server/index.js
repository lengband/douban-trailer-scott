const Koa = require('koa')
const app = new Koa()
const { htmlTpl, ejsTpl, pugTpl } = require('./tpl')
const ejs = require('ejs')
const pug = require('pug')

app.use(async (ctx, next) => {
  ctx.type = 'text/html; charset=utf-8'
  ctx.body = ejs.render(ejsTpl, {
    you: 'Scott',
    me: 'WangPeng'
  })
})

app.listen(4455)