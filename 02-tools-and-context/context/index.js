function Todo(title='', priority=0){
  this.title = title
  this.priority = priority
  this.timestamp = new Date()

  let wat = () => {
    let cool = () => {
    }
  }
}

new Todo('get eggs')

item = {}

Todo.call(item, 'get eggs', 3)

Todo.apply(item, ['get eggs', 4])

item


// a variatic function to add n numbers
function add(){
  console.log(arguments)
  return Array.prototype.reduce.call(arguments, (result, num) => {
    return result + num
  }, 0)
}


function map(cb, ctx){
  return Array.prototype.map.call(ctx, cb)
}

function reduce(ctx, ...args){
  console.log('ctx', ctx)
  console.log('args', args)
  return Array.prototype.reduce.apply(ctx, args)
}

function reduce(){
  let ctx = arguments[0]
  let args = Array.prototype.slice.call(arguments, 1)
  console.log('ctx', ctx)
  console.log('args', args)
  return Array.prototype.reduce.apply(ctx, args)
}


// example assertion
//let result = reduce("hello", (p, n) => p + n, '!!!')
//expect(result).toEqual('!!!hello'))

reduce("hello", (p, n) => p + n)




