let emptyState = {}

//try {
  //emptyState = JSON.parse(localStorage.cards) || {}
//} catch (err) {}

// (prevState, action) => newState
export default (state=emptyState, {type, payload}) => {
  let sectionID, sectionCards, result
  switch(type){
    case 'SECTION_CREATE':
      // payload is a section
      // crate and array for the sections cards
      return { ...state, [payload.id]: [] }
    case 'SECTION_REMOVE':
      // payload is a section
      // delete the array with the sections cards
     return { ...state, [payload.id]: undefined }
    case 'CARD_UPDATE_SECTION_ID':
      let card = payload.card
      // remove card rom current section
      let oldSectionID = card.sectionID
      let oldSection = state[card.sectionID].filter(item => item.id !== card.id)
      // add card to future secction
      card.sectionID = payload.sectionID
      let newSection = [card, ...state[payload.sectionID]]
      return {
        ...state,
        [oldSectionID]: oldSection,
        [card.sectionID]: newSection,
      }
    case 'CARD_CREATE':
      /// payload is a card
      sectionID = payload.sectionID
      sectionCards = state[sectionID]
      result = [...sectionCards, payload]
      return { ...state, [sectionID]: result }

    case 'CARD_UPDATE':
      /// payload is a card
      sectionID = payload.sectionID
      sectionCards = state[sectionID]
      result = sectionCards.map(item => 
        item.id === payload.id ? payload : item)
      return { ...state, [sectionID]: result }

    case 'CARD_REMOVE':
      /// payload is a card
      sectionID = payload.sectionID
      sectionCards = state[sectionID]
      result = sectionCards.filter(item => item.id !== payload.id) 
      return { ...state, [sectionID]: result }
    default:
      return state
  }
}
