'use strict'

const greet = module.exports = {};

greet.sayHello = function(strName='world') {
    if(typeof strName === "string")
        return `Hello ${strName}`;
    return null;
}