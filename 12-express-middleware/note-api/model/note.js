'use strict'

const mongoose = require('mongoose')

const noteSchema = mongoose.Schema({
  title: {type: String, required: true, unique: true},
  content: {type: String, required: true, minlength: 10},
  timestamp: {type: Date , default: () => new Date()},
})

// add vallidation and hooks to schema
module.exports = mongoose.model('note', noteSchema)

// add static methods to the model (constructor)

