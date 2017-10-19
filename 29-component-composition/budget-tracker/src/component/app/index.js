import React from 'react'
import {BrowserRouter, Route, Link} from 'react-router-dom'
import Dashboard from '../dashboard'

class App extends React.Component {
  render(){
    return (
      <div className='app'>
        <BrowserRouter>
          <div>
            <header>
              <h1> budget tracker </h1>
              <nav>
                <ul>
                  <li> <Link to='/'> home </Link> </li>
                  <li> <Link to='/dashboard'> dasboard</Link> </li>
                </ul>
              </nav>
            </header>
            <Route exact path='/' component={() => <h1> landing </h1>} />
            <Route exact path='/dashboard' component={Dashboard} />
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default App
