import React from 'react'
import {connect} from 'react-redux'
import CategoryForm from '../category-form'
import CategoryItem from '../category-item'
import * as category from '../../action/category.js'

//does it have state? no
//does it have props? yes (match, location, history, categories, categoryCreate)
//doe it use props? yes (categories, categoryCreate)
class Dashboard extends React.Component {
  render(){
    let {
      categories,
      categoryCreate,
    } = this.props

    return (
      <div className='dashboard'>
        <CategoryForm onComplete={categoryCreate} />
        {categories.map((category, i) =>
          <CategoryItem
            category={category}
            key={i}
          />
        )}
      </div>
    )
  }
}

let mapStateToProps = (state) => {
  return {
    categories: state,
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    categoryCreate: (data) => dispatch(category.create(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
