import React from 'react'

let emptyState = {
  title: '', 
  price: 0 ,
}

class ExpenseForm extends React.Component {
  constructor(props){
    super(props)
    let {expense} = props
    this.state = expense ? expense : emptyState

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.expense){
      this.setState(nextProps.expense)
    }
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.onComplete(this.state)
    // resest form
    this.setState(emptyState)
    console.log('reset form')
  }

  handleChange(e){
    let {name, value, type} = e.target
    value = type === 'number' ? Number(value) : value
    this.setState({[name]: value})
  }

  render(){

    let buttonText = this.props.expense ? 'update expense' : 'create expense'
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
        <button type='submit'> {buttonText} </button>
      </form>
    )

  }
}

export default ExpenseForm
