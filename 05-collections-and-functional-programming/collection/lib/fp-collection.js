'use strict'

const collection = module.exports = {}

collection.create = () => {
  return {length: 0}
}

collection.append = (value, collection) => {
  let result = Object.assign({}, collection)
  result[result.length] = value
  result.length++
  return result
}

//collection.append = (value, collection) => 
  //{...collection, [collection.length]: value, length: collection.length + 1}

collection.get = (index, collection) => collection[index]

collection.set = (index, value, collection) => {
  let result = Object.assign({}, collection)
  if(index < 0 || index >= collection.length)
    return result
  result[index] = value
  return result
}

collection.remove = (index, collection) => {
  let result = Object.assign({}, collection)
  for(let i=index; i<result.length; i++){
    result[i] = result[i] + 1
  }
  result.length--
  return result
}












