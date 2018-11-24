const axios = require('axios')
const crypto = require('crypto')
const date = new Date().toGMTString()
const key = 'wangpeng'
const secret = 'wangpeng123456'
const method = 'GET'
const uri = '/douban-trailer/?usage'

// const method = 'PUT'
// const uri = '/douban-trailer/https://img3.doubanio.com/view/photo/m/public/p2533283770.webp/to/file'


function sign(key, secret, method, uri, date, policy = null, md5 = null) {
    let elems = [];
    [method, uri, date, policy, md5].forEach(item => {
        if (item != null) {
            elems.push(item)
        }
    })
    let value = elems.join('&')
    let auth = hmacsha1(secret, value)
    return `UPYUN ${key}:${auth}`
}
function MD5(value) {
    return crypto.createHash('md5').update(value).digest('hex')
}
function hmacsha1(secret, value) {
    return crypto.createHmac('sha1', secret).update(value, 'utf-8').digest().toString('base64')
}

// 上传，处理，内容识别有存储
console.log(sign(key, MD5(secret), method, uri, date), 'sign')

const signature = sign(key, MD5(secret), method, uri, date)

const instance = axios.create({
  baseURL: 'https://v0.api.upyun.com/',
  timeout: 5000,
  headers: {
    'Authorization': signature,
    'Date': date
  }
});

instance.get('/douban-trailer/?usage').then(res => {
  console.log(res, 'resss')
}).catch(error => {
  console.log(error, 'error')
})

// instance.put('/douban-trailer/https://img3.doubanio.com/view/photo/m/public/p2533283770.webp/to/file',{
//   Date: date,
//   'Content-Length': 74702
// }).then(res => {
//   console.log(res, 'resss')
// }).catch(error => {
//   console.log(error, 'error')
// })
