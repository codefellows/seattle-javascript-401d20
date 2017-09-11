'use strict'

/* 
 * Export a function that takes in a name and returns "hello " + name
 */

module.exports = function(name='world'){
  return `hello ${name}`
}
