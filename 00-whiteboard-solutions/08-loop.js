// Write a recursive function called loop that 
// has the function signature (count, callback) => undefined
// it should call the callback count times (count is expected to be > 0)
const loop = (count, callback) => {
  if(count < 1) return
  callback()
  loop(count - 1, callback)
}

// usage:
// loop(3, () => console.log('hello loop'))
