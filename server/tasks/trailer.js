const cp = require('child_process');
const { resolve } = require('path');

(async () => {
  const script = resolve(__dirname, '../crawler/video.js')
  const child = cp.fork(script, [])
  let invoked = false

  child.on('error', err => {
    if (invoked) return
    invoked = true
    console.log(err, 'movie---------->error -> err')
  })

  child.on('exit', code => {
    if (invoked) return

    invoked = true
    let err = code === 0 ? null : new Error('exit code' + code)
    console.log(err, 'movie---------->exit -> err')
  })

  child.on('message', data => {
    // https://img3.doubanio.com/img/trailer/medium/2531818052.jpg
    let result = data
    console.log(result, 'movie---------->on -> message')
  })
})()