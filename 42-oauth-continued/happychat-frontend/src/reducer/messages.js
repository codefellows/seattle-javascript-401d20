export default (state=[], {type, payload}) => {
  switch(type){
    case 'MESSAGE_CREATE':
      return [...state, payload]
    case 'TOKEN_REMOVE':
      return []
    default: 
      return state
  }
}
