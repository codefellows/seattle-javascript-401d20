'use strict'


let add = a => b => a + b 
let minus = a => b => b - a


let modulo = a => b => b % a

Promise.reject(3)
.catch(err => {
  console.error(err)
  return Promise.reject(4)
})
.then(add(10))
.then(modulo(4))
.then(minus(2))
.then(console.log) 
.catch(console.error)
