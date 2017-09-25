// return the nth from last node in a linked list

let nthFromLast = (result, num) => {
  let offset = node
  for(var i=0; i<num && offset; i++)
    offset = offset.next
  if(i < num)
    return null
  while(offset){
    result = result.next
    offset = offset.next
  }
  return result
}
