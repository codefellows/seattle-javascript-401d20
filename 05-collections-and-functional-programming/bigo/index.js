'use strict'


// BigO of object lookup
// O(1) or constant time

getKey = (key, object) => {
  return object[key]
}

getKey('haha', {hello: 'world', goodbye: 'mars'})


// BigO of finding a value in an array
// O(n) or linear time

findValue = (value, collection) => {
  for(var i=0; i<collection.length; i++){
    if(collection[i] === value)
      return true
  }
  return false
}


findValue('hello', [1,2,4, 5, 833])


// Binary Search
// BigO(log(n))
binarySearch = (value, collection) => {
  let data = [...collection]
  while(data.length){
    console.log(data)
    let middle = Math.floor(data.length / 2)
    if(data[middle] === value)
      return true
    else if (data[middle] < value)
      data = data.slice(middle + 1)
    else
      data = data.slice(0, middle)
  }
  return false
}

binarySearch(-1, [1,2,3,4,5,6,7])


// For looop in a For loop each running N times
// O(n2)

let swap = (collection, indexA, indexB) => {
  let temp = collection[indexA]
  collection[indexA] = collection[indexB]
  collection[indexB] = temp
}

function selectionSort(collection){
  var iMin, i,j, n;
  for (j = 0; j < n-1; j++) {
    iMin = j;
    for (i = j+1; i < n; i++) {
      if (a[i] < a[iMin]) 
          iMin = i;
    }
    if(iMin != j) 
        swap(collection, j, iMin);
  }
  return collection
}

selectionSort([1,4,-8, 3])


// ref vs val
//a = [1,2, 3]

//mutate = (collection) => {
  //collection = [...collection]
  //collection.push(5)
  //return collection
//}

//mutate(a)

//a

a














