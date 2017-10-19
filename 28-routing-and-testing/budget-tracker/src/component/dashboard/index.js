import React from 'react'
import ExpenseForm from '../expense-form'

class Dashboard extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      expenses: [],
    }

    this.addExpense = this.addExpense.bind(this)
  }
  
  addExpense(expense){
    expense.create = new Date()
    expense.id = Math.random()
    this.setState(prevState => ({
      expenses: [...prevState.expenses, expense],
    }))
  }

  componentDidUpdate(){
    console.log('__STATE__', this.state)
  }

  render(){
    let total = this.state.expenses.reduce((result, expense) => result + expense.price, 0)
    return (
      <div className='dashboard'>
        <h1> dash Component </h1>
        <ExpenseForm onComplete={this.addExpense} />
        <p> total: ${total} </p>
      </div>
    )
  }
}

export default Dashboard
