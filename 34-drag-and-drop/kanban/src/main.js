import './style/main.scss'
import React from 'react'
import ReactDom from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'

import App from './component/app'
import reducer from './reducer'

import session from './lib/redux-session.js'
import reporter from './lib/redux-reporter.js'

let store = createStore(reducer, applyMiddleware(session, reporter))

const container = document.createElement('div')
document.body.appendChild(container)
ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>, 
container)

