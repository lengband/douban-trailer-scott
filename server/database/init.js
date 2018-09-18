const mongoose = require('mongoose')
const db = 'mongodb://localhost/douban-test'

mongoose.Promise = global.Promise

exports.connect = () => {
  let maxConnectTimes = 0
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV !== 'production') {
      mongoose.set('debug', true)
    }
    mongoose.connect(db,{
      useNewUrlParser:true})

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
      const Dog = mongoose.model('Dog', {
        name: String
      })
      const doga = new Dog({ name: '李福贵' })
      doga.save().then(() => {
        console.log('富贵：汪汪汪！')
      })
      console.log('Mongodb Connected Successfully!')
      resolve()
    })
  })
  
}