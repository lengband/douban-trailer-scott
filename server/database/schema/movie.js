const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Mixed = Schema.Types.Mixed
const ObjectId = Schema.Types.ObjectId

const MovieSchema = new mongoose.Schema({
  doubanId: String,
  rate: Number,
  title: String,
  summary: String,
  video: String,
  cover: String,
  poster: String,
  videoKey: String,
  coverKey: String,
  posterKey: String,
  rawTitle: String,
  year: String,
  movieTypes: [String],
  category: [{
    type: ObjectId,
    ref: 'Category'
  }],
  pubdate: Mixed,
  tags: Mixed,
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  }
}, {
  usePushEach: true
})

MovieSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }

  next()
})

mongoose.model('Movie', MovieSchema)
