'use strict';

const faker = require('faker');
const Charity = require('../../model/charity.js');

let create = () => {
  // let result = {};
  return new Charity({
    name: faker.lorem.words(10),
    streetAdd: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    zip: faker.address.zipCode(),
    mission: faker.lorem.words(30),
    cause: faker.lorem.words(10),
    rating: faker.random.number(),
    websiteURL: faker.internet.url(),
    photoURL: faker.image.imageUrl(),
    keywords: [faker.lorem.words(10)],
    category: faker.lorem.words(10),
    phoneNumber: faker.phone.phoneNumber(),
    email: faker.internet.email(),
  }).save();
};

let createMany = (num) => {
  return Promise.all(new Array(num).fill(0).map(() => create()));
};

let remove = () => Charity.remove({});

module.exports = {create, createMany, remove};
