import React from 'react'

class MessageForm extends React.Component {
  constructor(props){
    super(props)
    this.state = { 
      content: '' ,
      submitted: false,
    }

    this.emptyState = {...this.state}
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e){
    this.setState({content: e.target.value})
  }

  handleSubmit(e){
    e.preventDefault()
    if(this.state.content){
      this.props.onComplete(this.state)
      this.setState(this.emptyState)
    } else {
      this.setState({submitted: true})
    }
  }

  render(){
    return (
      <form 
        onSubmit={this.handleSubmit}
        className='message-form'>

        <textarea 
          name='content'
          placeholder='Share your mind!'
          value={this.state.content}
          onChange={this.handleChange}
          />

        <button type='submit'> send </button>
      </form>
    )
  }
}

export default MessageForm
