import {combineReducers} from 'redux'
import token from './token.js'
import profile from './profile.js'
import messages from './messages.js'

export default combineReducers({ token , profile, messages})
