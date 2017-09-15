let instantiate = (constructor, ...args) => {
  let result = Object.create(constructor.prototype)
  result.__proto__.constructor = constructor
  constructor.apply(result, args)
  return result
}
