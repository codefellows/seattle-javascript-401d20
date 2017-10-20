const throttle = (fn, ms) => {
  let ready = true;
  return (...args) => {
    if(ready){
      ready = false
      setTimeout(() => ready = true, ms)
      return fn(...args)
    }
  }
}

