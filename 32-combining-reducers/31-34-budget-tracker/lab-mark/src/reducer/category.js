const emptyState = []

export default (state=emptyState, {type, payload}) => {
  // payload will be a category
  switch(type){
    case 'CATEGORY_CREATE':
      // append a category
      return [...state, payload]
    case 'CATEGORY_UPDATE':
      // repace a category in the state with an updated category(payload)
      return state.map(item => item.id === payload.id ? payload : item)
    case 'CATEGORY_DESTROY':
      // remove a category for the state
      return state.filter(item => item.id !== payload.id)
    default:
      return state
  }
}

//(prevState, action) => newState
