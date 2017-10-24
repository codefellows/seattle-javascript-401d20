export default create = ({content, sectionID}) => ({
  type: 'CARD_CREATE',
  payload: {
    content, 
    sectionID,
    id: btoa(Math.random()),
  }
})

export default update = (card) => ({
  type: 'CARD_UPDATE', 
  payload: card,
})

export default remove = (card) => ({
  type: 'CARD_REMOVE', 
  payload: card,
})
