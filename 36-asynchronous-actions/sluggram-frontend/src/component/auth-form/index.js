import React from 'react'
import * as util from '../../lib/util.js'
// form methods
// constructor
// render
// handleChange
// handleSubmit

let emptyState = {
  username: '',
  email: '',
  password: '',
}

class AuthForm extends React.Component {
  constructor(props){
    super(props)
    this.state = emptyState
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e){
    let {name, value} = e.target
    this.setState({[name]: value})
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.onComplete(this.state)
    this.setState(emptyState)
  }
  
  render(){
    let {
      type,
    } = this.props

    type = type === 'login' ? type : 'signup'

    return (
      <form 
        className='auth-form'
        onSubmit={this.handleSubmit} >
      
        <input
          name='username'
          placeholder='username'
          type='text'
          value={this.state.username}
          onChange={this.handleChange}
          />

        {util.renderIf(type != 'login',
          <input
            name='email'
            placeholder='email'
            type='email'
            value={this.state.email}
            onChange={this.handleChange}
            />
        )}

        <input
          name='password'
          placeholder='password'
          type='password'
          value={this.state.password}
          onChange={this.handleChange}
          />

        <button type='submit'> {type} </button>
      </form>
    )
  }
}

export default AuthForm
