const mongoose = require('mongoose')
const User = mongoose.model('User')
const Movie = mongoose.model('Movie')

export async function checkPassword (email, password) {
  let match = false
  // const user = await User.findOne({ email: email }).exec() // ? exec 是什么意思，为什么加上 exec() 后就有comparePassword 方法了
  const user = await User.findOne({ email: email })
  if (user) {
    match = await user.comparePassword(password, user.password)
  }
  return {
    match,
    user
  }
}

export async function findAndRemove (id) {
  const valid = mongoose.Types.ObjectId.isValid(id)
  if (valid) {
    const movie = await Movie.findOne({ _id: id })
    if (movie) {
      await movie.remove()
      return true
    }
  }
  return false
}

