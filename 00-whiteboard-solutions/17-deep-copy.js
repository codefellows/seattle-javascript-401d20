'use strict'

// deep copy an object

const deepCopy = (data) => {
  if(typeof data !== 'object')
    throw new Error('__USAGE_ERROR__ deepCopy requires an object')
  let result = {...data}
  Object.keys(result).forEach(key => {
    if(typeof result[key] === 'object')
      result[key] = deepCopy(result[key])
  })
  return result
}

