// immutably push, pop, remove first, and prepend
let data = [1,2,3,4,5,6]

let pushData = [...data, 7]
let popData = data.slice(0, -1)

let removeFirst = data.slice(1)
let prependData = [0, ...data]

