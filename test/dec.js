export const auth = (target, key, descriptor) => {
  // target[key] = '卢本伟'
  target['b'] = 'mewo~'
  return descriptor
}
const test = (target, key, descriptor) => {
  return descriptor
}

class adminController {
  b () {
  }
  @test
  @auth
  getMovieList (ctx, next) {
    console.log('i am getMovieList')
  }
}

const a = new adminController()
const b = new adminController()

console.log(a.b)

console.log(adminController.prototype.b)

// console.log(a === adminController.prototype)

