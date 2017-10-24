import React from 'react'

let emptyState  = {
  name: '',
  amount: 0,
}

// forms that represent resoruces 
// should be reusable for both create and update
// methods: 
//   constructor
//     intialze state to props.resoucre or empty state 
//     binds methods
//   handleChange
//     update view state from user input
//   handleSubmit
//     prevetDefault
//     invoke onComplete with the view state
//     clear form
//   componetWillReceiveProps
//     sync view state with App State if props.resource
//   render
//     create form view
// props:
//   onComplete
//   ?resource

class CategoryForm extends React.Component {
  constructor(props){
    super(props)
    this.state = this.props.category || emptyState
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e){
    let {value, name, type} = e.target
    value = type === 'number' ? Number(value) : value
    this.setState({[name]: value})
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.onComplete(this.state)
    this.setState(emptyState)
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.category)
      this.setState(nextProps.category)
  }

  render(){
    let buttonText = this.props.category ? 'update': 'create'

    return (
      <form
        onSubmit={this.handleSubmit}
        className='category-form'>

        <input
          type='text'
          name='name'
          placeholder='name'
          value={this.state.name}
          onChange={this.handleChange}
        />

        <input
          type='number'
          name='amount'
          placeholder='amount'
          value={this.state.amount}
          onChange={this.handleChange}
        />

        <button type='submit'> {buttonText} </button>

      </form>
    )
  }
}

export default CategoryForm
