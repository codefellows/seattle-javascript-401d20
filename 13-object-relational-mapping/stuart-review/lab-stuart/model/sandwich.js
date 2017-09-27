'use strict';

const mongoose = require('mongoose');

const sandwichSchema = mongoose.Schema({
  bread: { type: String, required: true },
  cheese: { type: String, required: true },
  spread: { type: String, required: true },
});

module.exports = mongoose.model('sandwich', sandwichSchema);
