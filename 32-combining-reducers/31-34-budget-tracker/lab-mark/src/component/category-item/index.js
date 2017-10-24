import React from 'react'
import CategoryForm from '../category-form'
import {connect} from 'react-redux'
import * as category from '../../action/category.js'

// does CategoryItem have state? no
// does CategoryItem have props? yes (category, categoryUpdate, categoryDestroy)
class CategoryItem extends React.Component {
  render(){
    let {category, categoryUpdate, categoryDestroy} = this.props

    return (
      <li className='category-item'>
        <p> Title: {category.name} </p>
        <p> Amount: {category.amount} </p>
        <button onClick={() => categoryDestroy(category)}>Delete</button>

        <h3> Update your category </h3>
        <CategoryForm onComplete={categoryUpdate} category={category}/>
      </li>
    )
  }
}

let mapStateToProps = (state) => ({})
let mapDispatchToProps = (dispatch) => ({
  categoryUpdate: (data) => dispatch(category.update(data)),
  categoryDestroy: (data) => dispatch(category.destroy(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CategoryItem)
