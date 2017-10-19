import React from 'react'
import ExpenseForm from '../expense-form'
import Modal from '../modal'

// is it stateful? NO
// does it have props? YES (expense, removeExpense)
// does it need props? YES (expense, removeExpense)

class ExpenseItem extends React.Component {
  render(){
    let {expense, removeExpense, updateExpense} = this.props

    let showEdit = () => updateExpense({...expense, editing: true})
    let hideEdit = () => updateExpense({...expense, editing: false})
    
    let updateAndClose = (expense) => {
      updateExpense({...expense, editing: false})
    }

    return (
      <li style={{background: '#aa0'}} className='expense-item'>
        <strong>{expense.title}</strong> 
        <span> ${expense.price}</span>
        <button onClick={showEdit}> Edit </button>
        <button onClick={() => removeExpense(expense)}> X </button>
        
        <Modal onClose={hideEdit} show={expense.editing} >
          <h1> Editing </h1>
          <ExpenseForm onComplete={updateAndClose} expense={expense}/>
        </Modal> 
      </li>
    )
  }
}

export default ExpenseItem
