import './style/main.scss'

// Components and Constructors are named with PascalCase
import faker from 'faker'
import React from 'react'
import ReactDom from 'react-dom'
import cowsay from 'cowsay-browser'

class Header extends React.Component {
  render() {
    return (
      <header className='cool beans'>
        <h1> Generate Cowsay Lorem </h1>
      </header>
    )
  }
};


// write module
class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      content: 'I need something good to say!',
      cow: 'default',
      cows: ['dragon', 'goat', 'kitty', 'milk', 'default'],
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e){
    this.setState({cow: e.target.value})
  }

  handleClick(){
    this.setState({ 
      content: cowsay.say({f: this.state.cow, text: faker.lorem.words(10)}),
    })
  }

  render(){
    let {content} = this.state
    return (
      <div>
        <Header />
        <button onClick={this.handleClick}> change cowsay </button>
        <pre> {content} </pre>
        <select 
          onChange={this.handleChange}
          value={this.state.cow} >

          {this.state.cows.map((name, i) => 
            <option key={name} value={name}> {name} </option>
          )}
        </select>
      </div>
    )
  }
}


console.log({app: new App()})

// export module
ReactDom.render(<App />, document.getElementById('root'))
