require('./assets/common.sass')

function changeTitle () {
  window.$('#app').html('parcel 构建')
}

setTimeout(function () {
  changeTitle()
}, 2000)