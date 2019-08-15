
import R from 'ramda'
import { symbolPrefix } from './constants'
import { changeToArr, resolvePath } from './utils'

export const routerArr = [] // 输出到 routes/index 注册

const setRouter = method => path => (target, key, descriptor) => {
  routerArr.push({
    target,
    method,
    path: resolvePath(path),
    callback: changeToArr(target[key])
  })
  return descriptor
}

export const Controller = path => target => (target.prototype[symbolPrefix] = path)

export const Get = setRouter('get')

export const Post = setRouter('post')

export const Put = setRouter('put')

export const Del = setRouter('delete')

const convert = middleware => (target, key, descriptor) => {
  target[key] = R.compose(
    R.concat(
      changeToArr(middleware)
    ),
    changeToArr
  )(target[key])
  return descriptor
}

export const Admin = roleExpected => convert(async (ctx, next) => {
  const { role } = ctx.session.user
  if (!role || role !== roleExpected) {
    return (
      ctx.body = {
        success: false,
        code: 403,
        err: '您没有权限，来错地方了'
      }
    )
  }
  if (!ctx.session.user) {
    return (
      ctx.body = {
        success: false,
        code: 401,
        err: '登录信息失效，重新登录'
      }
    )
  }
  await next()
})

export const Auth = convert(async (ctx, next) => {
  if (!ctx.session.user) {
    return (
      ctx.body = {
        success: false,
        code: 401,
        err: '登录信息失效，重新登录'
      }
    )
  }
  await next()
})

/**
 * @Required({
 *   body: ['name', 'password']
 * })
 */
export const Required = ruleObj => convert(async (ctx, next) => {
  let errors = []
  R.forEachObjIndexed(
    (value, key) => {
      errors = errors.concat(
        R.filter(
          item => !R.has(item, ctx.request[key])
        )(value)
      )
    }
  )(ruleObj)
  if (!R.isEmpty(errors)) {
    return (
      ctx.body = {
        success: false,
        code: 412,
        err: `${errors.join(',')} is required`
      }
    )
  }
  await next()
})