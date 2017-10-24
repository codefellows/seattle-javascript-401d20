import React from 'react'
import {connect} from 'react-redux'
import SectionForm from '../section-form'
import * as section from '../../action/section.js'

class Landing extends React.Component {
  render(){
    let {
      sections,
      sectionCreate,
      sectionRemove,
      sectionUpdate,
    } = this.props

    return (
      <div className='landing'>
        <SectionForm onComplete={sectionCreate} />
        {sections.map((section, i) => 
          <div key={i}>
            <h2> {section.title} </h2>
            <button onClick={() => sectionRemove(section)}>
              delete
            </button>
            <SectionForm section={section} onComplete={sectionUpdate} />
          </div>
        )}
      </div>
    )
  }
}

// return objects that will become props for the compoent
let mapStateToProps = (state) => {
  return {
    title: 'lulwat',
    sections: state.sections ,
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    cool: 'sweet',
    sectionCreate: (data) => dispatch(section.create(data)),
    sectionUpdate: (data) => dispatch(section.update(data)),
    sectionRemove: (data) => dispatch(section.remove(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing)


