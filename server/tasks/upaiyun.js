const upyun = require('upyun')
const axios = require('axios')
const crypto = require('crypto')
const date = new Date().toGMTString()
const key = 'wangpeng'
const secret = 'wangpeng123456'
const bucket = 'douban-trailer'
const method = 'GET'
const uri = '/douban-trailer/?usage'

const service = new upyun.Service(bucket, key, secret)
const client = new upyun.Client(service, getSignHeader);

function getSignHeader (service, method, path) {
  const { operatorName, password } = service
  console.log(operatorName, 'operatorName')
  console.log(password, 'password')
  const signature = sign(operatorName, password, method, path, date)
  console.log(signature, 'signature')
  return new Promise((res, rej) => {
    try {
      res(signature)
    } catch (error) {
      rej(new Error('获取 upyun 签名失败'))
    }
  })
}

function sign(key, secret, method, uri, date, policy = null, md5 = null) {
  console.log(arguments, 'aaaa')
    let elems = [];
    [method, uri, date, policy, md5].forEach(item => {
        if (item != null) {
            elems.push(item)
        }
    })
    let value = elems.join('&')
    let auth = hmacsha1(secret, value)
    return `UPYUN ${key}:${auth}`
    // return new Promise((res, rej) => {
    //   try {
    //     res(`UPYUN ${key}:${auth}`)
    //   } catch (error) {
    //     rej(new Error('获取 upyun 签名失败'))
    //   }
    // })
}
function MD5(value) {
    return crypto.createHash('md5').update(value).digest('hex')
}
function hmacsha1(secret, value) {
    return crypto.createHmac('sha1', secret).update(value, 'utf-8').digest().toString('base64')
}

// 上传，处理，内容识别有存储
// console.log(sign(key, MD5(secret), method, uri, date), 'sign')

// const signature = sign(key, MD5(secret), method, uri, date)

// const instance = axios.create({
//   baseURL: 'https://v0.api.upyun.com/',
//   timeout: 5000,
//   headers: {
//     'Authorization': signature,
//     'Date': date
//   }
// });

// instance.get('/douban-trailer/?usage').then(res => {
//   console.log(res, 'resss')
// }).catch(error => {
//   console.log(error, 'error')
// })


client.usage().then(function(size) {
  console.log('/sub/dir total used size: ' + size)
}).catch(error => {
  console.error(error, 'error')
})