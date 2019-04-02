const mongoose = require('mongoose');
const { 
  controller,
  get,
  admin,
  auth,
  del,
  required
} = require('../lib/decorator');
const { 
  gettAllMovies,
  getMovieDetail,
  getRelativeMovies
} = require('../service/movie')

@controller('api/v0/movies')
export class movieController {

  @get('/movie/list')
  @auth
  @admin('admin')
  async getMovieList (ctx, next) {
    const movies = await gettAllMovies()
    ctx.body = {
      success: true,
      data: movies
    }
  }

  @del('/movies')
  @required({
    query: ['id']
  })
  async remove (ctx, next) {
    const id = ctx.query.id
    const movie = await findAndRemove(id)
    const movies = await gettAllMovies()
    if (movie) {
      ctx.body = {
        code: 200,
        success: true,
        data: movies
      }
    } else {
      ctx.body = {
        code: 404,
        success: false,
        err: `未找到 ${id}`,
        data: movies
      }
    }
  }

  @get('/')
  async getMovies (ctx, next) {
    const { type, year } = ctx.query
    const movies = await gettAllMovies(type, year)
    ctx.body = {
      success: true,
      data: movies
    }
  }

  @get('/:id')
  async getMovieDetail (ctx, next) {
    const id = ctx.params.id
    const movie = await getMovieDetail(id)
    const relativeMovies = await getRelativeMovies(movie)

    ctx.body = {
      data: {
        movie,
        relativeMovies
      },
      success: true
    }
  }
}
