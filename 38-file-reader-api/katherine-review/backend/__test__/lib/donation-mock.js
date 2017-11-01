'use strict';

const faker = require('faker');
const Donation = require('../../model/donation.js');


let create = (profile, charity) => {
  return new Donation({
    amount: Math.floor(Math.random() * 100),
    inHonorOf: faker.name.findName(),
    charity: charity._id,
    profile: profile._id,
  }).save();
};

let createMany = (num, profile, charity) => {
  return Promise.all(new Array(num).fill(0).map(() => create(profile, charity)));
};

let remove = () => {
  return Promise.all([
    Donation.remove({}),
  ]);
};

module.exports = { create, createMany, remove };
