const mongoose = require('mongoose');
const { 
  controller,
  get,
  post,
  put
} = require('../lib/decorator');
const { 
  gettAllMovies,
  getMovieDetail,
  relativeMovies
} = require('../service/movie')

@controller('api/v0/movies')
export class movieController {
  @get('/')
  async getMovies (ctx, next) {
    const Movie = mongoose.model('Movie')
    const { type, year } = ctx.query
    const movies = await gettAllMovies(type, year)
    ctx.body = {
      movies
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
