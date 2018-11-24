const Upyun = require('upyun')
const { Service, Client } = Upyun
const key = 'wangpeng'
const secret = 'wangpeng123456'
const bucket = 'douban-trailer'

const client = new Client(new Service(bucket, key, secret))

console.log(client, 'client')

// client.usage().then(function(size) {
//   console.log('/sub/dir total used size: ' + size)
// }).catch(error => {
//   console.error(error, 'error')
// })

// listDir
client.listDir('/').then(function(files) {
  console.log(files, 'files')
}).catch(error => {
  console.error(error, 'error')
})
