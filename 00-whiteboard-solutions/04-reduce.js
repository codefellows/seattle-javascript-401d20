let reduce = (callback, initialState, collection) => {
  let accumulator = initialState
  for(var i=0; i<collection.length; i++){
    accumulator = callback(accumulator, collection[i], i, collection)
  }
  return accumulator
}
