import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as util from '../../lib/util.js';

class AuthRedirect extends React.Component {
  render(){
    let {location, history, token} = this.props;
    let {pathname} = location;
    let to = null;

    if(pathname == '/login' || pathname === '/signup' || pathname === '/'){
      if(token){
        to = '/dashboard';
      }
    } else {
      if(!token){
        to = '/';
      }
    }

    return (
      <div className='auth-redirect'>
        { to ? <Redirect to={to} /> : undefined }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  token: state.token,
})

export default connect(mapStateToProps)(AuthRedirect)
