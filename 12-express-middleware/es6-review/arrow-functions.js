'use strict'

// any time you see an arrow the immidate left of the arrow
// is paramiters and the right is a function body
//
// arrow functions with one paramiter do not need parrens around 
// the paramiters
// arrow functions that dont have a body implisity return the value
// to the right of the arrow
let greet = name => `Hello ${name ? name : 'world'}`
// arrow functinos with 0 pramas need parrens on params
let getRandom = () => Math.random()

// if you want to impliclty return and  object you must wrap it in parrens
// because curly braces are a function body so we must differentiate them
let noteCreate = title => ({ id: Math.random(), title })

let wat = 'hello world'
//let obj {wat: wat, cool: 'beans'}
let obj = {wat, cool: 'beans' }

// arrow functions with more than one param need parrens on params
let add = (a, b) => b + a

// an arrow function with a body (block) must have 
// explicit return statements to return a value

let multiply = (a, b) => {
  return a * b 
}



// destructory creates variables from object and arrays 

// object destructuring uses the object key as var names
let note = {
  id: '123', 
  name: 'get milk',
  priority: 5,
}
let {priority, name} = note
let {readFile} = require('fs')

// array destructuing uses the oreder to assing values to varnames
let abc =  ['a', 'b', 'c']
let [first, second] = abc

// super es6 statment
// destructuring the first paramiter of an arrow function and assigning 
// default values to the variables
let noteItemCreate = ({title='', content=''}) => ({
  id: Math.random(),
  timestamp: new Date(),
  title, 
  content,
})

//let noteItemCreate = (data) => ({
  //title: data.title,
  //content: data.content, 
  //id: Math.random()
//})


// 









let {readFile, writeFile} = require('fs')

let fileIO = {readFile, writeFile}




//let name = 'hello world'
//let data  = {name, age:23}
//let data = {name: name, age: 23}

let username = 'slorg'

let chartData = {
  [username]: 12,
}
// {slorg: 12}





