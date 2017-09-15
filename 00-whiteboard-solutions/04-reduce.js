// Define a function "reduce" that has the function signature (callback, initalState, collection) => Array
// Itterie first functions (callback first) are the functional programing way of working 
// with data. It makes the useage of the functions much more readable.
let reduce = (callback, initialState, collection) => {
  let accumulator = initialState
  for(var i=0; i<collection.length; i++){
    accumulator = callback(accumulator, collection[i], i, collection)
  }
  return accumulator
}
