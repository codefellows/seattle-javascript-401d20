import React from 'react'

let emptyState = {
  name: '',
  amount: 0 ,
}

class CategoryForm extends React.Component {
  constructor(props){
    super(props)
    this.state = this.props.category || emptyState
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.category){
      this.setState(nextProps.category)
    }
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.onComplete(this.state)
    this.setState(emptyState)
  }

  handleChange(e){
    let {name, value, type} = e.target
    value = type === 'number' ? Number(value) : value
    this.setState({[name]: value})
  }

  render(){
    let buttonText = this.props.category ? 'update category' : 'create category'
    return (
      <form
        className='category-form'
        onSubmit={this.handleSubmit}
        >
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
          step='any'
          value={this.state.amount}
          onChange={this.handleChange}
          />
        <button type='submit'> {buttonText} </button>
      </form>
    )

  }
}

export default CategoryForm
