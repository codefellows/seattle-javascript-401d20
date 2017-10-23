'use strict'

let {createStore} = require('redux')


//notes have title timestamp id 

store = createStore((state=[], {type, payload}) => {
  switch(type){
    case 'NOTE_CREATE':
      return [...state, payload]
    case 'NOTE_DELETE':
      return state.filter(item => item.id !== payload.id)
    case 'NOTE_UPDATE':
      return state.map(item => item.id === payload.id ? payload : item)
    default: 
      return state
  }
})


store.subscribe(() => console.log('NOTES', store.getState()))

noteCreate = ({title}) =>  ({
  type: 'NOTE_CREATE',
  payload: {
    title,
    id: Math.random(),
    timestamp: Date.now(),
  }
})

noteDelete = (note) => ({
  type: 'NOTE_DELETE',
  payload: note,
})

noteUpdate = (note) => ({
  type: 'NOTE_UPDATE',
  payload: note,
})


store.dispatch(noteCreate({title: 'sweet'}))


store.dispatch(noteDelete(store.getState()[0]))

let firstNote =  store.getState()[0]

store.dispatch(noteUpdate({...firstNote, title: 'cool beans'}))



store.getState()
