const mongoose = require('mongoose')

const NoteSchema = mongoose.Schema({
  title: String,
  description: String,
  status: String
})

module.exports = mongoose.model('Note', NoteSchema)
