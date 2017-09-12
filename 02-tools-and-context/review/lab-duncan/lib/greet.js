'use strict'

module.exports = (text) => {
  if(typeof text !== 'string') 
    return null
  return `hello ${text}`
}
