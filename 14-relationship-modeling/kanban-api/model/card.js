'use strict'

const mongoose = require('mongoose')
const httpErrors = require('http-errors')
const Category = require('./category.js')

const cardSchema = mongoose.Schema({
  content: {type: String, required: true, minlength: 10},
  timestamp: {type: Date, default: () => new Date()},
  category: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'categorie'},
})

// before we save a card we want to make sure its category extits
cardSchema.pre('save', function(done){
  Category.findById(this.category)
  .then(category => {
    if(!category)
      throw httpErrors(404, 'category not found')
    category.cards.push(this._id)
    return category.save()
  })
  .then(() => done())
  .catch(done)
})

cardSchema.post('remove', (doc, done) => {
  Category.findById(doc.category)
  .then(category => {
    if(!category)
      throw httpErrors(404, 'category not found')
    category.cards = category.cards.filter(card => {
      return card._id.toString() !== doc._id.toString()
    })
    return category.save()
  })
  .then(() => done())
  .catch(done)
})

module.exports = mongoose.model('card', cardSchema)
