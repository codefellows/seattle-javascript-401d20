import uuid from 'uuid'

// an action is object with a type and optional payload
// an action-creater is a function that returns a action

// takes in an object with a name and amount an
// returns a category create action
export const create = ({name, amount}) => ({
  type: 'CATEGORY_CREATE',
  payload: {
    name,
    amount,
    id: uuid.v1(),
    created: new Date(),
  },
})

export const update = (category) => ({
  type: 'CATEGORY_UPDATE',
  payload: category,
})

export const destroy = (category) => ({
  type: 'CATEGORY_DESTROY',
  payload: category,
})
