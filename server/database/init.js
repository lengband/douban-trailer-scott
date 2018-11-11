const mongoose = require('mongoose')
const db = 'mongodb://localhost/douban-test'
const glob = require('glob')
const { resolve } = require('path')

mongoose.Promise = global.Promise

exports.initSchemas = () => {
  glob.sync(resolve(__dirname, './schema/', '**/*.js')).forEach(require)
}
  
exports.initAdmin = async () => {
  const User = mongoose.model('User')
  let user = await User.findOne({
    username: 'lengband'
  })
  if (!user) {
    const user = new User({
      username: 'lengband',
      email: 'lengband@163.com',
      password: '123456',
      role: 'admin'
    })
    await user.save()
  }
}

exports.connect = () => {
  let maxConnectTimes = 0
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV !== 'production') {
      mongoose.set('debug', true)
    }
    mongoose.connect(db, {
      useNewUrlParser: true
    })

    mongoose.connection.on('disconnected', () => {
      maxConnectTimes++
      if (maxConnectTimes < 5) {
        mongoose.connect(db)
      } else {
        throw new Error('数据库挂了，快去修一哈~！')
      }
    })

    mongoose.connection.on('error', error => {
      console.log(error)
      maxConnectTimes++
      if (maxConnectTimes < 5) {
        mongoose.connect(db)
      } else {
        reject()
        throw new Error('数据库挂了，快去修一哈~！')
      }
    })

    mongoose.connection.once('open', () => {
      console.log('Mongodb Connected Successfully!')
      resolve()
    })
  })
  
}