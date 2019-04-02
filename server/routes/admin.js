const mongoose = require('mongoose');
const { 
  controller,
  post,
  required,
  get,
  admin,
  auth
} = require('../lib/decorator');
const { checkPassword, findAndRemove } = require('../service/user')
const { gettAllMovies } = require('../service/movie')

@controller('/admin')
export class adminController {

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

  @post('/login')
  @required({
    body: ['email', 'password']
  })
  async login (ctx, next) {
    const { email, password } = ctx.request.body
    const matchData = await checkPassword(email, password)
    if (!matchData.user) {
      return (ctx.body = {
        success: false,
        err: '用户不存在'
      })
    }

    if (matchData.match) {
      ctx.session.user = {
        _id: matchData.user._id,
        email: matchData.user.email,
        role: matchData.user.role,
        username: matchData.user.username
      }
      return (ctx.body = {
        success: true
      })
    }
    
    return (ctx.body = {
      success: false,
      err: '密码不正确'
    })
  }
}
