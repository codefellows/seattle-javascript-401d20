'use strict'

const fs = require('fs-extra')

//  ensure storage file exists 
fs.pathExists(process.env.STORAGE_PATH)
.then((exists) => {
  if(!exists)
    fs.writeJSON(process.env.STORAGE_PATH, [])
})

// export interface 
const storage = module.exports = {}

storage.fetch = () => {
  return fs.readJSON(process.env.STORAGE_PATH)
}

storage.setItem = (item) => {
  if(!item.id) 
    return Promise.reject(new Error('__STORAGE_ERROR__ item must have an id'))
  return storage.fetch()
  .then(items => {
    return fs.writeJSON(process.env.STORAGE_PATH, [...items, item]) 
  })
  .then(() => item)
}


storage.fetchItem = (id) => {
  return storage.fetch()
  .then(items => {
    return items.reduce((result, item) => {
      if(item.id === id)
        return item 
      return result
    }, null)
  })
  .then(result => {
    if(!result)
      throw new Error('__STORAGE_ERROR__ item not found')
    return result
  })
}

storage.deleteItem = (id) => {
  return store.fetch()
  .then(items => {
    return items.filter((item) => item.id !== id)
  })
  .then(items => fs.writeJSON(process.env.STORAGE_PATH, items))
}

