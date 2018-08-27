const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const { resolve } = require('path')

require('./crawler/trailer-list')

app.use(views(resolve(__dirname, './views'), {
  extension: 'pug'
}))

app.use(async (ctx, next) => {
  await ctx.render('index', {
    you: 'Scott',
    me: 'WangPeng'
  })  
})
console.log('port at 4455')
app.listen(4455)