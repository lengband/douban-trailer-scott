// e.g. http://api.douban.com/v2/movie/subject/1764796
const rp = require('request-promise-native')

async function fetchMovie(item) {
  const url = `http://api.douban.com/v2/movie/subject/${item.doubanId}`
  const res = await rp(url)
  return res
};

(async () => {
  let movies = [
    {
      doubanId: 27621448,
      title: '范保德',
      rate: 7.1,
      poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2521300455.jpg'
    },
    {
      doubanId: 30122633,
      title: '快把我哥带走',
      rate: 7,
      poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2531080870.jpg'
    }
  ]
  movies.map(async movie => {
    let movieData = await fetchMovie(movie)
    console.log(movieData, 'movieData')
  })
})()