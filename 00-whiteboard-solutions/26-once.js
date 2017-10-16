let once = (fn) =>  {
  let done = false
  return (...args) => {
    if(done) return
    done = true
    return fn(...args)
  }
}
