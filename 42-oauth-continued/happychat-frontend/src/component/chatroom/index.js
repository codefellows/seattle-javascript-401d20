import React from 'react'
import {connect} from 'react-redux'

import * as message from '../../action/message.js'
import MessageForm from '../message-form'


class Chatroom extends React.Component {
  render(){
    return (
      <div className='chatroom'>
        <h1> chatroom </h1>
        <MessageForm onComplete={this.props.messageCreate}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({})
const mapDispatchToProps = (dispatch) => ({
  messageCreate: (content) => dispatch(message.createRequest(content)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Chatroom)

