import {combineReducers} from 'redux'

import categories from './categories.js'
import expenses from './expenses.js'

// retruns a reducer 
// its inital state will be 
// {
//   categories: [],
//   expenses: {},
// }
// its function signature is (prevState, action) => nextState
export default combineReducers({
  categories,
  expenses,
})

