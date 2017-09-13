// nesting keeps asynchronous code serial 
setTimeout(() => {
  console.log('one')
  setTimeout(() => {
    console.log('two')
    setTimeout(() => {
      console.log('three')
      setTimeout(() => {
        console.log('four')
      }, 100)
    }, 50)
  }, 0)
}, 1000)

//setTimeout(() => {
  //console.log('one')
//}, 1000)

//setTimeout(() => {
  //console.log('two')
//}, 0)

//setTimeout(() => { 
  //console.log('three')
//}, 50)

//setTimeout(() => {
  //console.log('four')
//}, 100)
