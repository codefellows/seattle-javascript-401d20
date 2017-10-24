import React from 'react'
import {BrowserRouter, Redirect,  Route, Link} from 'react-router-dom'
import Dashboard from '../dashboard'
import Landing from '../landing'

// does it have state? no
// does it have any props? no
class App extends React.Component {
  render(){
    return (
      <div className='app'>
        <h1> Budget Tracker </h1>
        <BrowserRouter>
          <div>
            <nav>
              <ul>
                <li><Link to='/'> home </Link> </li>
                <li><Link to='/dashboard'> dashboard </Link></li>
              </ul>
            </nav>
            <Route exact path='/' component={Landing} />
            <Route exact path='/dashboard' component={Dashboard} />
            <Route path='*' component={() => <Redirect to='/' />} />
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default App
