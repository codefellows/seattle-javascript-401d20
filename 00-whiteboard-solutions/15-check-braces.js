'use strict'

const checkBraces = (text) => {
  let openBraces = new Set(['{', '(', '['])
  let closeBraces = new Set(['}', ')', ']'])
  let braceMatch = { '}': '{', ']': '[', ')': '(' }
  let stack = []
  for(let i=0;i<text.length; i++){
    let ch = text[i]
    if(openBraces.has(ch))
      stack.push(ch)
    if(closeBraces.has(ch))
      if(stack.pop() !== braceMatch[ch])
        return false
  }
  return  stack.pop() ? false : true
}
