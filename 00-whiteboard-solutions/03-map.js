// Define a function "map" that has the function signature (callback, collection) => Array
// Itterie first functions (callback first) are the functional programing way of working 
// with data. It makes the useage of the functions much more readable.
let map = (callback, collection) => {
    let result = []
    for(let i=0; i<collection.length; i++){
        result.push(callback(collection[i], i, collection))
    }
    return result 
}
