'use strict';

let greet = require('../lib/greet.js');

test('greet.sayHello() should return hello world', function() {
    expect(greet.sayHello('mundo')).toEqual('Hello mundo');
});

test('greet.sayHello should return null if input is not a string',function() {
    expect(greet.sayHello({})).toEqual(null);
});  