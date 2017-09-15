// Define a function "reduce" that has the function signature (callback, [initalState,] collection) => Array
// Itterie first functions (callback first) are the functional programing way of working 
// with data. It makes the useage of the functions much more readable.
//
// reduce with optional initalState
// reduce(callback, collection) 
// reduceBonus(callback, initialState, collection)

let reduceBonus = (...args) => {
  let collection = args.splice(-1)[0]
  let [callback, initialState ] = args
  let hasInitalState = initialState !== undefined
  let i = hasInitalState ? 0 : 1
  let accumulator = hasInitalState ? initialState : collection[0] 
  while(i<collection.length){
    accumulator = callback(accumulator, collection[i], i, collection)
    i++
  }
  return accumulator
}
