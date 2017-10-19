import React from 'react'

class ExpenseForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      title: '',
      price: 0,
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.onComplete(this.state)
    this.setState({title: '', price: 0})
  }

  handleChange(e){
    let {name, value, type} = e.target
    value = type === 'number' ? Number(value) : value
    this.setState({[name]: value})
  }

  render(){
    return (
      <form 
        className='expense-form'
        onSubmit={this.handleSubmit} 
        >
        <input 
          type='text'
          name='title'
          placeholder='title'
          value={this.state.title}   
          onChange={this.handleChange}
          />

        <input 
          type='number'
          name='price'
          placeholder='price'
          step='any'
          value={this.state.price}   
          onChange={this.handleChange}
          />
        <button type='submit'> create expense </button>
      </form>
    )

  }
}

export default ExpenseForm
