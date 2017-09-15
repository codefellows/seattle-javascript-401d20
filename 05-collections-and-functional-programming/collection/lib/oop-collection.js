'use strict'

const Collection = module.exports = function(){
  this.length = 0
}

Collection.prototype.append = function(value){
  this[this.length] = value 
  this.length++
}

Collection.prototype.prepend = function(value) {
  for(let i=this.length; i>0; i--){
    this[i] = this[i - 1]
  }
  this[0] = value
  this.length++
}

Collection.prototype.get = function(index){
  return this[index]
}

Collection.prototype.set = function(index, value){
  if(index < 0 || index >= this.length)
    throw new Error('index must be greather than 0 and less than lenth')
  this[index] = value 
}

Collection.prototype.remove = function(index){
  for(let i=index;  i<this.length; i++){
    this[i] = this[i+1]
  }
  this.length--
}


Collection.prototype.map = function(callback){
  let result = new Collection()
  for(let i=0; i<this.length; i++){
    result.append(callback(this[i], i, this))
  }
  return result
}

Collection.prototype.filter = function(callback){
  let result = new Collection()
  for(let i=0; i<this.length; i++){
    if(callback(this[i], i, this))
      result.append(this[i])
  }
  return result
}
