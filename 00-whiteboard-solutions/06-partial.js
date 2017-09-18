// write a partial application function

const partial = (fn, ...defaults) => (...args) => fn(...defaults, ...args)
