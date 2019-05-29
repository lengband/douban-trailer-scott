const mongoose = require('mongoose');
const { 
  controller,
  get,
  admin,
  auth,
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

  @get('/')
  async getMovies (ctx, next) {
    const { type, year } = ctx.query
    const movies = await gettAllMovies(type, year)
    console.log(movies, 'movies')
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
