
var emptyState = []

//try {
  //emptyState = JSON.parse(localStorage.sections) || []
//} catch (error){}


export const validateSection = (section) => {
  if(!section.title)
    throw new Error('section expected a title')
}

export default (state=emptyState, {type, payload}) => {
  switch(type){
    case 'SECTION_CREATE':
      validateSection(payload)
      return [...state, payload]
    case 'SECTION_UPDATE':
      return state.map(item => item.id === payload.id ? payload : item)
    case 'SECTION_REMOVE':
      return state.filter(item => item.id !== payload.id)
    case 'SECTION_CLEAR':
      return emptyState
    default:
      return state
  }
}
