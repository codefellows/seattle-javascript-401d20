'use strict'

const superagent = require('superagent')


// 3 ways to create a promise

// 1) create a new instane using the constructor
//let getName = () => new Promise((resolve, reject) => { resolve('duncan') })

// 2) use the static convienence method Promise.resolve(valeue)
//getName = () => Promise.resolve('duncan')

// 3) use the static convienence mehtod Promise.reject(value)
//getName = () => Promise.reject(new Error('something went wrong'))

// There are two instance methods for handling success and failure

let partial = (fn, ...defaults) => (...args) => fn(...defaults, ...args)

let logSuccess = partial(console.log, 'successs')
let logFailure = partial(console.log, 'failure')

//Promise.reject(2)
//.then(number => number * 2)
//.catch(number => {
  //throw number - 1
//})
//.then(logSuccess)
//.catch(logFailure)

Promise.reject('hello world')
.catch(value => value)
.then(search => search.split(' ').join('%20'))
.then((search) => superagent.get('http://www.duckduckgo.com?q=', search))
.then(res => res.body)
.then(logSuccess)

//.then(body => body.data)
//.then(data => data.children.map(listing => listing.data.domain))
//.then(domains => superagent.get(domains[0]))
//.then(res => res.text)













