'use strict'

const Arithmetic = module.exports = {};

Arithmetic.add = function(a,b)
{
    if(typeof a !== 'number' || typeof b !== 'number')
        return null;

    return a+b;
}

Arithmetic.substract = function(a,b)
{
    if(typeof a !== 'number' || typeof b !== 'number')
        return null;

    return a-b;
}