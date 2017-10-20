'use strict'

const aritmetic = require('../lib/arithmetic.js');

test('#add',function()
{
    expect(aritmetic.add(2,5)).toBe(7);
    expect(aritmetic.add({},2)).toBe(null);
});