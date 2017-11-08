import React from 'react'
import {connectAdvanced} from 'react-redux'

import * as message from '../../action/message.js'
import MessageForm from '../message-form'

const mapStore = (dispatch) => (state) => ({
  messages: state.messages,
  messageCreate: (content) => dispatch(message.createRequest(content)),
})

class Chatroom extends React.Component {
  render(){
    return (
      <div className='chatroom'>
        <h1> chatroom </h1>
        <ul> 
          {this.props.messages.map((message, key) => 
            <li key={key}>
              <strong> {message.username}: </strong>
              <p> {message.content} </p>
            </li>
          )}
          
        </ul>

        <MessageForm onComplete={this.props.messageCreate}/>
      </div>
    )
  }
}


export default connectAdvanced(mapStore)(Chatroom)

