import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minLength: 5,
  },
  published: {
    type: Number,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
  },
  genres: [{ type: String }],
})

export default mongoose.model('Book', schema)
