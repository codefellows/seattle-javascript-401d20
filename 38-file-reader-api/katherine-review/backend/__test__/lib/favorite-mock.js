'use strict';

const Favorite = require('../../model/favorite.js');

let create = (profile, charity) => {
  // let result = {};
  return new Favorite({
    account: profile.account,
    profile: profile._id,
    charity: charity._id,
  }).save();
};

let createMany = (num, profiles, charities) => {
  let favorites = [];
  let rand = (arr) => Math.floor(Math.random() * arr.length);
  return Promise.all(new Array(num).fill(0).map(() => {
    let dup = true;
    let profile = profiles[rand(profiles)];
    let charity = charities[rand(charities)];

    while(dup) {
      if(favorites.includes(`${profile._id.toString()}${charity._id.toString()}`)) {
        profile = profiles[rand(profiles)];
        charity = charities[rand(charities)];
      } else {
        dup = false;
      }
    }
    favorites.push(`${profile._id.toString()}${charity._id.toString()}`);
    return create(profile, charity);
  }));
};

let remove = () => Favorite.remove({});

module.exports = { create, createMany, remove };
