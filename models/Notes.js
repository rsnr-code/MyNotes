const mongoose = require('mongoose')

const NotesSchema = new mongoose.Schema({
  note: {
    type: String,
    required: false,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Notes', NotesSchema);
