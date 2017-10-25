import React from 'react'
import CategoryForm from '../category-form'
import CategoryItem from '../category-item'
import {connect} from 'react-redux'
import * as category from '../../action/category.js'

class Dashboard extends React.Component {
  render(){
    let {
      categories,
      categoryCreate,
    } = this.props

    return (
      <div className='dashboard'>
        <h1> dash Component </h1>
        <CategoryForm onComplete={categoryCreate} />
        {categories.map((category, i) =>
          <CategoryItem
            key={i}
            category={category}
            />
        )}
      </div>
      )
    }
  }

  let mapStateToProps = (state) => {
    return {
      categories: state.categories,
    }
  }

  let mapDispatchToProps = (dispatch) => {
    return {
      categoryCreate: (data) => dispatch(category.create(data)),
    }
  }


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
