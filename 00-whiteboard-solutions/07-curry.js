// curry functions

let add = (a) => (b) => b + a
let sub = (a) => (b) => b - a
/* 
 * add(1)(2) // 3
 * sub(10)(3) = -13
 * let sub10 = sub(10)
 * sub10(4) // -14
*/

let push = (value) => (collection) => [...collection, value]
let concat = (value) => (collection) => collection.concat(value)

/*
 * push(3)([1,2]) // [1,2,3]
 * concat([1,2])([3,4]) // [3,4, 1, 2]
*/


