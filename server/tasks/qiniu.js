const qiniu = require('qiniu')
const nanoid = require('nanoid')
const config = require('../config')
 
const bucket = config.qiniu.bucket
const mac = new qiniu.auth.digest.Mac(config.qiniu.AK, config.qiniu.SK)
const cfg = new qiniu.conf.Config()
const client = new qiniu.rs.BucketManager(mac, cfg)

const uploadToQiniu = async (url, key) => {
  return new Promise((resolve, reject) => {
    client.fetch(url, bucket, key, (err, ret, info) => {
      if (err) {
        reject(err)
      } else {
        if (info.statusCode === 200) {
          resolve({ key })
        } else {
          reject(info)
        }
      }
    })
  })
};

(async () => {
  let movies = [{
    video: 'http://vt1.doubanio.com/201809032113/743425efac587304f08ee6d8884d09c8/view/movie/M/402350302.mp4',
    doubanId: '27606054',
    poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2529088881.jpg',
    cover: 'https://img3.doubanio.com/img/trailer/medium/2531818052.jpg'
  }]
  const res = {
    video: 'http://vt1.doubanio.com/201809032113/743425efac587304f08ee6d8884d09c8/view/movie/M/402350302.mp4',
    doubanId: '27606054',
    poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2529088881.jpg',
    cover: 'https://img3.doubanio.com/img/trailer/medium/2531818052.jpg',
    videoKey: '1h5g4dTLd6APidPKpBvu1.mp4',
    coverKey: 'R5mVsQInZOOb4SxySWEtU.jpg',
    posterKey: 'iKgB79HaTjVsFDkCOzmQt.jpg'
  }
  movies.map(async movie => {
    if (movie.video && !movie.key) {
      try {
        console.log('开始传video')
        let videoData = await uploadToQiniu(movie.video, nanoid() + '.mp4')
        console.log('开始传cover')
        let coverData = await uploadToQiniu(movie.cover, nanoid() + '.jpg')
        console.log('开始传poster')
        let posterData = await uploadToQiniu(movie.poster, nanoid() + '.jpg')
        if (videoData.key) {
          movie.videoKey = videoData.key
        }
        if (coverData.key) {
          movie.coverKey = coverData.key
        }
        if (posterData.key) {
          movie.posterKey = posterData.key
        }
        console.log(movie)
      } catch (error) {
        console.log(error)
      }
    }
  })
})()