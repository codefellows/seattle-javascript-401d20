import React from 'react'
import CategoryForm from '../category-form'
import {connect} from 'react-redux'
import * as category from '../../action/category.js'
import ExpenseForm from '../expense-form'
import ExpenseItem from '../expense-item'
import * as expense from '../../action/expense.js'

class CategoryItem extends React.Component {
  render(){
    let {
      category,
      categoryDestroy,
      categoryUpdate,
      expenseCreate,
      expenses,
    } = this.props

    let categoryExpenses = expenses[category.id]

    return (
      <li className='category-item'>
        <h1> Category Name and Budget </h1>
        <p><strong>{category.name}</strong></p>
        <p>${category.amount}</p>
        <button onClick={() => categoryDestroy(category)}> X </button>

          <h2> Update Category </h2>
          <CategoryForm category={category} onComplete={categoryUpdate}/>

          <h2> Log Expense </h2>
          <ExpenseForm category={category} onComplete={expenseCreate}/>
          {categoryExpenses.map((expense, i) =>
            <ExpenseItem expense={expense} key={i} />
          )}
      </li>
    )
  }
}

let mapStateToProps = (state) => ({
  expenses: state.expenses
})

let mapDispatchToProps = (dispatch) => ({
  categoryUpdate: (data) => dispatch(category.update(data)),
  categoryDestroy: (data) => dispatch(category.destroy(data)),
  expenseCreate: (data) => dispatch(expense.create(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CategoryItem)
