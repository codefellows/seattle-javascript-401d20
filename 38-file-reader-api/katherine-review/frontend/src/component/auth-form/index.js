import React from 'react';
import * as util from '../../lib/util.js';
import validator from 'validator';

let emptyState = {
  username: '',
  usernameDirty: false,
  usernameError: 'Username is required!',
  email: '',
  emailDirty: false,
  emailError: 'Email is required!',
  password: '',
  passwordDirty: false,
  passwordError: 'Password is required!',
  submitted: false,
};

class AuthForm extends React.Component {
  constructor(props){
    super(props);
    this.state = emptyState;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateChange = this.validateChange.bind(this);
  }

  validateChange(name, value){
    if(this.props.type === 'login')
      return null;
    switch(name){
      case 'username':
        if(value.length < 6)
          return 'Your name username must be 6 characters.';
        if(!validator.isAlphanumeric(value))
          return 'Your name username may only contain numbers and letters.';
        return null;
      case 'email':
          if(!validator.isEmail(value))
            return  'You must provide a valid email';
        return null;
      case 'password':
        if(value.length < 8)
          return 'Your name password must be 8 characters.';
        if(!validator.isAlphanumeric(value))
          return 'Your name password may only contain numbers and letters.';
        return null;
      default:
        return null;
    }
  }

  handleChange(e){
    let {name, value} = e.target;
    this.setState({
      [name]: value,
      [`${name}Dirty`]: true,
      [`${name}Error`]: this.validateChange(name, value),
    });
  }

  handleSubmit(e){
    e.preventDefault()
    let {nameError, emailError, passwordError} = this.state
    if (this.props.type === 'login' || !nameError && !emailError && !passwordError){
      this.props.onComplete(this.state)
      this.setState(emptyState)
    } else {
      this.setState({
        usernameDirty: true,
        emailDirty: true,
        passwordDirty: true,
        submitted: true
      })
    }
  }

  render(){
    let {
      type,
    } = this.props;

    type = type === 'login' ? type : 'signup';

    return (
      <form
        className='auth-form'
        noValidate
        onSubmit={this.handleSubmit} >

        {util.renderIf(this.state.usernameDirty,
          <p> {this.state.usernameError } </p>)}

        <input
          className={util.renderIf(
            this.state.usernameDirty && this.state.usernameError, 'invalid')}
          name='username'
          placeholder='username'
          type='text'
          value={this.state.username}
          onChange={this.handleChange}
          />

        {util.renderIf(type != 'login',
          <div>
            {util.renderIf(this.state.emailDirty,
              <p> {this.state.emailError} </p>)}
            <input
              className={util.renderIf(
                this.state.emailDirty && this.state.emailError, 'invalid')}
              name='email'
              placeholder='email'
              type='email'
              value={this.state.email}
              onChange={this.handleChange}
              />
          </div>
        )}

        {util.renderIf(this.state.passwordDirty,
          <p> {this.state.passwordError} </p>)}
        <input
          className={util.renderIf(
            this.state.passwordDirty && this.state.passwordError, 'invalid')}
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
