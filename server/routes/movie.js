const { 
  Controller,
  Get,
  Admin,
  Auth,
} = require('../lib/decorator');
const { 
  gettAllMovies,
  getMovieDetail,
  getRelativeMovies
} = require('../service/movie')

@Controller('api/v0/movies')
export class movieController {

  @Get('/movie/list')
  @Auth
  @Admin('admin')
  async getMovieList (ctx, next) {
    const movies = await gettAllMovies()
    ctx.body = {
      success: true,
      data: movies
    }
  }

  @Get('/')
  async getMovies (ctx, next) {
    const { type, year } = ctx.query
    const movies = await gettAllMovies(type, year)
    ctx.body = {
      success: true,
      data: movies
    }
  }

  @Get('/:id')
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
