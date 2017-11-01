'use strict';

const mongoose = require('mongoose');

const charitySchema = mongoose.Schema({
  name: {type: String, required: true, unique: true},
  streetAdd: {type: String, required: true},
  city: {type: String, required: true},
  state: {type: String},
  zip: {type: String},
  mission: {type: String, required: true},
  cause: {type: String, required: true},
  rating: {type: String, required: true},
  websiteURL: {type: String, required: true},
  photoURL: {type: String, required: true},
  keywords: [{type: String, required: true}],
  category: {type: String, required: true},
  phoneNumber: {type: String, required: true},
  email: {type: String, required: true},
  created: {type: Date, default: () => new Date()},
});

module.exports = mongoose.model('charity', charitySchema);
