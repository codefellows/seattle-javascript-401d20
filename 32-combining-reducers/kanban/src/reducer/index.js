import {combineReducers} from 'redux'

import sections from './sections.js'
import cards from './cards.js'

export default combineReducers({
  sections, 
  cards,
})
