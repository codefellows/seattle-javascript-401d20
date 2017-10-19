import React from 'react'
import ExpenseForm from '../expense-form'
import ExpenseItem from '../expense-item'

// is this statefull? YES (expenses)
// does it have props? YES (history, matches, location)
// does it need props? NO
class Dashboard extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      expenses: [],
    }

    this.addExpense = this.addExpense.bind(this)
    this.removeExpense = this.removeExpense.bind(this)
    this.updateExpense = this.updateExpense.bind(this)
  }
  
  addExpense(expense){
    let result = {
      ...expense,
      id: Math.random(),
      created: new Date(),
      editing: false,
    }
    this.setState(prevState => ({
      expenses: [...prevState.expenses, result],
    }))
  }

  removeExpense(expense){
    this.setState(prevState => ({
      expenses: prevState.expenses.filter(item => item.id !== expense.id),
    }))
  }

  updateExpense(expense){
    this.setState(({expenses}) => ({
      expenses: expenses.map(item => item.id === expense.id ? expense : item),
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
        {this.state.expenses.map((expense, i) => 
          <ExpenseItem 
            key={i} 
            expense={expense} 
            removeExpense={this.removeExpense} 
            updateExpense={this.updateExpense}
            />
        )}
        <p> total: ${total} </p>
      </div>
    )
  }
}

export default Dashboard
