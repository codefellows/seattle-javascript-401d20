
counter = () => {
  let state = 0
  return {
    inc: (value=1) => {
      state += value
    },
    dec: (value=1) => {
      state -= value 
    },
    get: () => state,
  }
}
