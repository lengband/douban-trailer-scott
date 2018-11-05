const mongoose = require('mongoose')
const User = mongoose.model('User')

export async function checkPassword (email, password) {
  let match = false
  const user = await User.findOne({ email: email }).exec() // ? exec 是什么意思，为什么加上 exec() 后就有comparePassword 方法了
  if (user) {
    match = await user.comparePassword(password, user.password)
  }
  console.log(match, 'match')
  return {
    match,
    user
  }
}
