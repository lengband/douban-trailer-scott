const Koa = require('koa')
const mongoose = require('mongoose')
const views = require('koa-views')
const { resolve } = require('path');
const { connect, initSchemas } = require('./database/init');

(async () => {
  try {
    await connect()
    initSchemas()
    const Movie = mongoose.model('Movie')
    const movies = await Movie.find({})
  } catch (error) {
    console.log(error)
  }
})();

const app = new Koa();

app.use(views(resolve(__dirname, './views'), {
  extension: 'pug'
}));

app.use(async (ctx, next) => {
  await ctx.render('index', {
    you: 'Scott',
    me: 'WangPeng'
  })  
})
console.log('port at 4455')
app.listen(4455)