import React from 'react'

// forms that represent resoruces 
// // should be reusable for both create and update
// // methods: 
// //   constructor
// //     intialze state to props.resoucre or empty state 
// //     binds methods
// //   handleChange
// //     update view state from user input
// //   handleSubmit
// //     prevetDefault
// //     invoke onComplete with the view state
// //     clear form
// //   componetWillReceiveProps
// //     sync view state with App State if props.resource
// //   render
// //     create form view
// // props:
// //   onComplete
// //   ?resource
//      ?other

let emptyState = { content: '' } 

// does it need props? yes (section, onComplete, ?card)
class CardForm extends React.Component {
  constructor(props){
    super(props)
    this.state = props.card || emptyState

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e){
    this.setState({content: e.target.value})
  }

  handleSubmit(e){
    e.preventDefault()
    let sectionID = this.props.section ?  
      this.props.section.id : 
      this.props.card.sectionID

    this.props.onComplete({
      ...this.state, 
      sectionID,
    })

    this.setState(emptyState)
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.card)
      this.setState(nextProps.card)
  }
  
  render(){
    let buttonText = this.props.card ? 'update' : 'create'
    return (
      <form 
        className='card-form'
        onSubmit={this.handleSubmit}
        >

        <input 
          type='text'
          name='content'
          placeholder='content'
          value={this.state.content}
          onChange={this.handleChange}
          />

        <button type='submit'> {buttonText} card </button>
      </form>
    )
  }

}

export default CardForm
