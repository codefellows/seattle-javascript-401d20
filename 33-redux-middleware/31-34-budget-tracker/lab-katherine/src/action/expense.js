import uuidv1 from 'uuid/v1'

export const create = ({categoryID, name, price}) => ({
  type: 'EXPENSE_CREATE',
  payload: {
    categoryID,
    name,
    price,
    id: uuidv1(),
    timestamp: new Date(),
  }
})

export const update = (expense) => ({
  type: 'EXPENSE_UPDATE',
  payload: expense,
})

export const destroy = (expense) => ({
  type: 'EXPENSE_DELETE',
  payload: expense,
})
