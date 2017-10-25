const emptyState = {}

// expenses [ae, be ,ce ,ce , be , ae ] XXXXXX bad XXXXX

// why listen to category create?
//   adds an array assaociated with the categoryID to the state
//   {
//     a: [], 
//     c: [],
//   }
// when a category is destoryed what do ?
// remove them

//totalSpent =  (state=0, action) => {
  //case: EXPENSE_CREATE
    //return state + action.payload.price
  //case: EXPENSE_DESTROY
    //return state - action.payload.price
  //default: 
    //return state
//}

// (prevState, action) => newState
export default (state=emptyState, {type, payload}) => {
  let categoryID, categoryExpenses, result
  switch(type){
    case 'CATEGORY_CREATE':
      return { ...state, [payload.id]: [] }
    case 'CATEGORY_DESTROY': 
      // payload is a category
      //let result = {...state}
      //delete result[payload.id]
      //return result
      return { ...state, [payload.id]: undefined}
    case 'EXPENSE_CREATE':
      categoryID = payload.categoryID
      categoryExpenses = state[categoryID]
      result = [...categoryExpenses, payload]
      return { ...state, [categoryID]: result }
    case 'EXPENSE_UPDATE':
      categoryID = payload.categoryID
      categoryExpenses = state[categoryID]
      result = categoryExpenses.map(item =>
        item.id === payload.id ? payload : item)
      return { ...state, [categoryID]: result }
    case 'EXPENSE_DELETE':
      categoryID = payload.categoryID
      categoryExpenses = state[categoryID]
      result = categoryExpenses.filter(item => item.id !== payload.id)
      return { ...state, [categoryID]: result }
    default:
      return state
  }
}
