import React from 'react'
import ReactDOM from 'react-dom'
import superagent from 'superagent'

class PokemonNameChange extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.pokemon.name || ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e){
    this.setState({name: e.target.value})

  }

  handleSubmit(e){
    e.preventDefault()
    this.props.changePokemonName(this.props.pokemon.name, this.state.name)
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit} >
        <input 
          type='text'
          name='pokemonName'
          value={this.state.name}
          onChange={this.handleChange}
          />
        <button type='submit'> update name </button>
      </form>
    )
  }
}

class PokemonItem extends React.Component {
  constructor(props){ 
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(){
    if(!this.props.pokemon.imageURL){
      superagent.get(this.props.pokemon.url)
      .then(res  => {
        console.log('res', res)
        this.props.updatePokemon({
          ...this.props.pokemon,
          imageURL: res.body.sprites.front_default,
          height: res.body.height,
        })
      })
    }
  }

  render(){
    let {pokemon} = this.props
    return (
       <li onClick={this.handleClick}>
         <p> {pokemon.name} </p>
         {pokemon.imageURL ? <img src={pokemon.imageURL} />: undefined }
         {pokemon.height ? <p> height {pokemon.height} </p> : undefined }
        <PokemonNameChange 
          pokemon={pokemon}
          changePokemonName={this.props.changePokemonName} 
          />
      
       </li>
    )
  }
}

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      pokemon: []
    }

    this.updatePokemon = this.updatePokemon.bind(this)
    this.changePokemonName = this.changePokemonName.bind(this)
  }

  changePokemonName(pastName, futureName){
    this.setState(prevState => {
      return { 
        pokemon: prevState.pokemon.map(item => {
          return item.name === pastName ? {...item, name: futureName} : item
        })
      }
    })
  }

  updatePokemon(pokemon){
    this.setState(prevState => {
      return { 
        pokemon: prevState.pokemon.map(item => {
          return item.name === pokemon.name ? pokemon : item
        })
      }
    })
  }

  componentDidMount(){
    console.log('will mount')
    // make superagent request to the pokeapi 
    superagent.get('https://pokeapi.co/api/v2/pokemon/')
    .then(res => {
      if(res.body.results)
        this.setState({pokemon: res.body.results})
    })
    .catch(console.error)
  }

  componentDidUpdate(){
    console.log('__STATE__', this.state)
  }

  render(){
    console.log('render')
    return (
      <div>
        <h1> pokéslug </h1>
        <ul>
         {this.state.pokemon.map((pokemon, i) => 
           <PokemonItem 
             pokemon={pokemon} 
             changePokemonName={this.changePokemonName}
             updatePokemon={this.updatePokemon} 
             key={i} />
         )}
        </ul>
      </div>
    )
  }
}

// create a refrence to a dom node on the body
// to mount the app
let container = document.createElement('div')
document.body.appendChild(container)
ReactDOM.render(<App />, container)


