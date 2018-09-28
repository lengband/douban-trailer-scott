const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { Mixed, ObjectId } = Schema.Types

const movieSchema = new Schema({
  doubanId: {
    unique: true,
    type: String
  },

  category: {
    type: ObjectId,
    ref: 'Category'
  },

  rate: Number,
  title: String,
  summary: String,
  poster: String,
  cover: String,

  videoKey: String,
  posterKey: String,
  coverKey: String,

  rawTitle: String,
  movieTypes: [String],
  pubdate: Mixed,
  year: Number,

  tags: [String],

  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})

movieSchema.pre('save', next => {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updateAt = Data.now()
  } else {
    this.meta.updateAt = Data.now()
  }
  next()
})
console.log(123)
mongoose.model('Movie', movieSchema)