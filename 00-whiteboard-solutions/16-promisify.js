// write a promisfity function

let promisify = (fn) => (...args) => {
  return new Promise((resolve, reject) => {
    fn(...args, (err, data) => {
      if (err) return reject(err)
      resolve(data)
    })
  })
}
