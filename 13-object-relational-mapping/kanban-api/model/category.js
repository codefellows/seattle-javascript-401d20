'use strict'

const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
  title: {type: String, required: true, unique: true},
  keywords: [{type: String}],
  timestamp: {type: Date, default: () => new Date()},
  // cards: [{type: mongoose.Schema.Types.ObjectID, ref: 'card'}]
})

module.exports = mongoose.model('categorie', categorySchema)
