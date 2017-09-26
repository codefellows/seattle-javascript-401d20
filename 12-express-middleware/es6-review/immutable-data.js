// imutable arrays
// built in array functions that are immutable are
// concat map filter reduce slice


// how to copy an array 
let a = [1,2, 3]
let aCopyA = a.slice()
let aCopyB = [...a]
let aCopyC = a.concat()

// how to push data immutably
let data = [1,2,3,4]
let pushedA = [...data, 5, 6, 7]
let pushedB = data.concat([5, 6, 7])

// how to prepend data immutably
let prependedA = [5, 6, 7, ...data]
let prependedB = [5, 6, 7].concat(data)

// pop data
let popedA = data.slice(0, -1)
let popedB = data.slice(0, data.length - 1)

// remove first
let removedFirst = data.slice(1)

// sort an array imutably
let sortedA = data.slice().sort()
let sortedB = [...data].sort()




// imuatble objects

let data = {
  id: Math.random(),
  name: 'cool',
  version: '0.1.1'
  type: 'amazing',
}

// copy an object
let dataCopyA = Object.assign({}, data) 
let dataCopyB = {...data}

// add a property to an object 
// copy + add property
let withContentA = Object.assign({}, data, {content: 'hahahahah coool'})
let withContentB = {...data, content: 'halallala cool'}

// change a proepty
let withDifferentVersionA = Object.assign({}, data, {version: '2.2.2'})
let withDifferentVersionB = {...data, version: '2.2.2'}

// remove a proerty
let withDifferentVersionA = Object.assign({}, data, {name: undefined})
let withDifferentVersionB = {...data, name: undefined}





















