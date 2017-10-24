export const create = ({content, sectionID}) => ({
  type: 'CARD_CREATE',
  payload: {
    content, 
    sectionID,
    id: btoa(Math.random()),
  }
})

export const update = (card) => ({
  type: 'CARD_UPDATE', 
  payload: card,
})

export const remove = (card) => ({
  type: 'CARD_REMOVE', 
  payload: card,
})
