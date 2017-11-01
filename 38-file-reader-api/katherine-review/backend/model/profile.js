'use strict';

const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  city: { type: String },
  state: { type: String },
  donationGoal: { type: Number },
  moneySpent: { type: Number },
  photo: {type: String},
  bio: { type: String },
  location: {
    type: {type: String, default: 'Point'},
    coordinates: [{type: Number}],
  },
  account: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
});

module.exports = mongoose.model('profile', profileSchema);
