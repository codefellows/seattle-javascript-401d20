// immutably push, pop, remove first, and prepend
let data = [1,2,3,4,5,6]

// with array spread 
let pushDataA = [...data, 7]
let prependDataA = [0, ...data]

// with concat
let pushDataB = data.concat([7])
let prependDataB = [0].concat(data)

let popData = data.slice(0, -1)
let removeFirst = data.slice(1)

// immutably  add a key, update a key, and remove a key from an object
let note = {
  title: 'hello world',
  priority: 0, 
}

// with object spread
let withContentA = {...note, content: 'example data'}
let updateTitleA = {...note, title: 'get milk'}
let removeTitleA = {...note, title: undefined}

// with Object.assign
let withContentB = Object.assign({}, note, {content: 'example data'})
let updateTitleB = Object.assign({}, note, {title: 'get milk'})
let removeTitleB = Object.assign({}, note, {title: undefined})
