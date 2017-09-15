// define a function "instantiate" that operates as a replacement for the new Keyword
// it should have the function signature (construcor, ...args) => instance

let instantiate = (constructor, ...args) => {
  let result = Object.create(constructor.prototype)
  result.__proto__.constructor = constructor
  constructor.apply(result, args)
  return result
}
