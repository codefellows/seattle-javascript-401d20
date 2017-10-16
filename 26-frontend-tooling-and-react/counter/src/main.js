// import assets
import './style/main.scss'

// import npm packages
import React from 'react'
import ReactDom from 'react-dom'

let Header = () => {
  return React.createElement('header', {},  
      React.createElement('h1', {}, 'Counter'))
}

// write module
class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      counter: 0,
      title: 'hello',
    }

    this.handleInc = this.handleInc.bind(this)
    this.handleDec = this.handleDec.bind(this)
    this.handleCounterSet = this.handleCounterSet.bind(this)
  }

  handleInc(){
    this.setState((prevState) => {
      return { counter: prevState.counter + 1}
    })
  }

  handleDec(){
    this.setState((prevState) => {
      return { counter: prevState.counter - 1 }
    })
  }

  handleCounterSet(e){
    let {value} = e.target
    this.setState({counter: value})
  }

  render(){
    return (
      <div>
        <Header />
        <button onClick={this.handleInc}> inc </button>
        <button onClick={this.handleDec}> dec </button>
        <input 
          type='number' 
          value={this.state.counter} 
          onChange={this.handleCounterSet}
          />
        <p> counter: {this.state.counter} </p>
        <p> {this.state.title} </p>
      </div>
    )
  }
}

// export module
ReactDom.render(<App />, document.getElementById('root'))
