import React from 'react'
import {connect} from 'react-redux'
import {BrowserRouter,Route} from 'react-router-dom'
import * as profile from '../action/profile.js'

import Landing from './landing'
import Chatroom from './chatroom'

class App extends React.Component {
  componentWillMount(){
    let {loggedIn, profile} = this.props
    if(loggedIn && !profile){
      this.props.profileFetch()
      .catch(console.error)
    }
  }

  render(){
    return (
      <div className='app'>
        <BrowserRouter>
          <div>
            <Route exact path='/' component={Landing} />
            <Route path='/chatroom' component={Chatroom} />
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
  loggedIn: !!state.token,
  profile: state.profile,
})

let mapDispatchToProps = (dispatch) => ({
  profileFetch: () => dispatch(profile.fetchRequest()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
