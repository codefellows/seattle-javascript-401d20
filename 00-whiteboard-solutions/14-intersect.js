'use strict'

// write a function that will intersect two arrays
let intersect = (a, b) => {
  let result = []
  let found = {} 
  for(let i=0; i<a.length; i++)
    found[a[i]] = true
  for(let i=0; i<b.length; i++)
    if(found[b[i]])
      result.push(b[i])
  return result
}

// better version
let betterIntersect = (a, b) => {
  let found = new Set(a)
  return b.reduce((result, value) => {
    return found.has(value) ? [...result, value] : result
  }, [])
}
