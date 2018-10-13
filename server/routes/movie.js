const mongoose = require('mongoose');
const Router = require('koa-router');

const router = new Router();

@controller('api/v0/movies')
export class movieController {
  @get('/')
  @login
  @admin(['developer']) // 判断是否是开发者权限
  @log
  async getMovies (ctx, next) {
    const Movie = mongoose.model('Movie')
    const movies = await Movie.find({}).sort({
      'meta.createdAt': -1
    })
    ctx.body = {
      movies
    }
  }

  @get('/:id')
  async getMovieD (ctx, next) {
    const Movie = mongoose.model('Movie')
    const movies = await Movie.find({}).sort({
      'meta.createdAt': -1
    })
    ctx.body = {
      movies
    }
  }
}
 

router.get('/movies/all', async (ctx, next) => {
 
})

router.get('/movies/detail/:id', async (ctx, next) => {
  const Movie = mongoose.model('Movie')
  const id = ctx.params.id
  const movie = await Movie.find({ _id: id })
  ctx.body = {
    movie
  }
})

module.exports = router
