const {
  Controller,
  Post,
  Required,
  Get,
  Admin,
  Auth,
  Del,
} = require('../lib/decorator');
const {
  checkPassword,
  findAndRemove
} = require('../service/user')
const {
  gettAllMovies
} = require('../service/movie')

@Controller('/admin')
export class adminController {

  @Get('/movie/list')
  @Auth
  @Admin('admin')
  async getMovieList(ctx, next) {
    const movies = await gettAllMovies()
    ctx.body = {
      success: true,
      data: movies
    }
  }

  @Post('/login')
  @Required({
    body: ['email', 'password']
  })
  async login(ctx, next) {
    const {
      email,
      password
    } = ctx.request.body
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

  @Del('/movies')
  @Required({
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
}

// ctx
// {
//   request: {
//     method: 'POST',
//     url: '/admin/login',
//     header: {
//       host: 'localhost:4455',
//       connection: 'keep-alive',
//       'content-length': '47',
//       accept: 'application/json, text/plain, */*',
//       origin: 'http://localhost:4455',
//       'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36',
//       dnt: '1',
//       'content-type': 'application/json;charset=UTF-8',
//       referer: 'http://localhost:4455/admin',
//       'accept-encoding': 'gzip, deflate, br',
//       'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8'
//     }
//   },
//   response: {
//     status: 404,
//     message: 'Not Found',
//     // header: [Object: null prototype] {}
//   },
//   app: {
//     subdomainOffset: 2,
//     proxy: false,
//     env: 'development'
//   },
//   originalUrl: '/admin/login',
//   req: '<original node req>',
//   res: '<original node res>',
//   socket: '<original node socket>'
// }

// session
// {
//   _sessCtx: ContextSession {
//     ctx: {
//       request: [Object],
//       response: [Object],
//       app: [Object],
//       originalUrl: '/admin/login',
//       req: '<original node req>',
//       res: '<original node res>',
//       socket: '<original node socket>'
//     },
//     app: {
//       subdomainOffset: 2,
//       proxy: false,
//       env: 'development'
//     },
//     opts: {
//       key: 'koa:sess',
//       maxAge: 86400000,
//       overwrite: true,
//       httpOnly: false,
//       signed: true,
//       rolling: false,
//       autoCommit: true,
//       encode: [Function: encode],
//       decode: [Function: decode],
//       genid: [Function]
//     },
//     store: undefined,
//     session: [Circular],
//     prevHash: 3234215159
//   },
//   _ctx: {
//     request: {
//       method: 'POST',
//       url: '/admin/login',
//       header: [Object]
//     },
//     response: {
//       status: 404,
//       message: 'Not Found',
//       header: [Object: null prototype] {}
//     },
//     app: {
//       subdomainOffset: 2,
//       proxy: false,
//       env: 'development'
//     },
//     originalUrl: '/admin/login',
//     req: '<original node req>',
//     res: '<original node res>',
//     socket: '<original node socket>'
//   },
//   user: {
//     _id: '5be0454b1451076967040e06',
//     email: 'lengband@163.com',
//     role: 'admin',
//     username: 'lengband'
//   },
//   _expire: 1554732048946
// }