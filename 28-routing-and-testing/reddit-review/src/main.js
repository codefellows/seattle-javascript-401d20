import React from 'react'
import ReactDOM from 'react-dom'
import superagent from 'superagent'

class SearchResultList extends React.Component {
  render(){
    let searchResults = this.props.searchResults 
    return (
      <ul> 
        {searchResults.map(result => 
          <li> 
            <p> {result.title} </p>
            <p> up votes: {result.ups} </p>
            <a href={result.url}> click me </a>
          </li>
        )}
      </ul>
    )
  }
}

class SearchForm extends React.Component {
  //constructor with view state (for inputs)
  constructor(props){
    super(props)
    this.state = {
      searchTerm: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  //handleSubmit
  handleSubmit(e){
    e.preventDefault()
    return this.props.onComplete(this.state.searchTerm)
  }

  //handleChange for inputs
  handleChange(e){
    let {name, value} = e.target
    this.setState({[name]: value})
  }

  //render
  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          name='searchTerm'
          value={this.state.searchTerm}
          onChange={this.handleChange}
          />
        <button type='submit'> search </button>
      </form>
    )
  }
}

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      searchResults: [],
    }

    this.searchReddit = this.searchReddit.bind(this)
  }

  searchReddit(searchTerm){
    return superagent.get(`https://www.reddit.com/r/${searchTerm}.json`)
    .then(res => {
      let {children} = res.body.data
      let searchResults = children.map(child => child.data)
      return this.setState({searchResults})
    })
    .catch(console.error)
  }

  componentWillMount(){
    this.searchReddit('programming')
  }

  componentDidUpdate(){
    console.log('__STATE__', this.state)
  }

  render(){
    return (
      <main >
        <h1> reddit search </h1>
        <SearchForm onComplete={this.searchReddit} />
        <SearchResultList searchResults={this.state.searchResults} />
      </main>
    )
  }
}

let container = document.createElement('div')
document.body.append(container)
ReactDOM.render(<App />, container)
