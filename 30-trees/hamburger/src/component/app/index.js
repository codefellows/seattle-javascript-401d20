import React from 'react'
import Hamburger from '../hamburger'

class App extends React.Component {
  render() {
    return (
      <div className='app'>
        <Hamburger>
          <h1> tools </h1>
          <nav>
            <ul>
              <li><a href="/"> cool </a></li>
              <li><a href="/"> cool </a></li>
              <li><a href="/"> cool </a></li>
              <li><a href="/"> cool </a></li>
            </ul>
          </nav>
        </Hamburger>
        
        <h1> booyea </h1>
      </div>
    )
  }
}

export default App
