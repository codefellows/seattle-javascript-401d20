import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import AuthForm from '../auth-form';
import * as util from '../../lib/util.js';
import * as auth from '../../action/auth.js';
import * as clientProfile from '../../action/client-profile.js';

class Landing extends React.Component {
  constructor(props){
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleLogin(user){
    this.props.login(user)
    .then(() => {
      this.props.fetchClientProfile();
      this.props.history.push('/dashboard');
    })
    .catch(console.error);
  }

  handleSignup(user){
    this.props.signup(user)
    .then(() => {
      this.props.history.push('/profile');
    })
    .catch(console.error);
  }

  render(){
    let {
      location,
    } = this.props;
    return (
      <div className='landing'>
        {util.renderIf(location.pathname === '/',
          <div>
            <h2> welcome </h2>
          </div>
        )}

        {util.renderIf(location.pathname === '/signup',
          <div>
            <h2> signup </h2>
            <AuthForm onComplete={this.handleSignup} />
            <p> already have an account? </p>
            <Link to='/login'> login </Link>
          </div>
        )}

        {util.renderIf(location.pathname === '/login',
          <div>
            <h2> login </h2>
            <AuthForm type='login' onComplete={this.handleLogin} />
            <p> dost thou not have an account? </p>
            <Link to='/signup'> signup </Link>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
})

const mapDispatchToProps = (dispatch) => ({
  signup: (user) => dispatch(auth.signup(user)),
  login: (user) => dispatch(auth.login(user)),
  fetchClientProfile: () => dispatch(clientProfile.fetch()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Landing)
