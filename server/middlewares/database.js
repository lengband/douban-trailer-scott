import { join } from 'path'
import glob from 'glob'
import mongoose from 'mongoose'
import config from '../../config'

mongoose.Promise = global.Promise

glob.sync(join(__dirname, '../database/schema', '**/*.js')).forEach(require)
  
export const initAdmin = async () => {
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

export const connect = app => {
  const { db } = config

  const connect = db => mongoose.connect(db, {
    useNewUrlParser: true,
    // useMongoClient: true
  })

  let maxConnectTimes = 0
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV !== 'production') {
      mongoose.set('debug', true)
    }
    connect(db)

    mongoose.connection.on('disconnected', () => {
      maxConnectTimes++
      if (maxConnectTimes < 5) {
        connect(db)
      } else {
        throw new Error('数据库挂了，快去修一哈~！')
      }
    })

    mongoose.connection.on('error', error => {
      console.log(error)
      maxConnectTimes++
      if (maxConnectTimes < 5) {
        connect(db)
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