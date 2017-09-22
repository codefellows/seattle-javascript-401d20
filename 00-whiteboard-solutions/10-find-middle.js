// find the middle of a linked list
let findMidle = (list) => {
  let fast = list
  let slow = list
  while(fast.next){
    fast = fast.next.next
    slow = slow.next
  }
  return slow
}
