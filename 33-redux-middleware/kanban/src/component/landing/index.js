import './_landing.scss'
import React from 'react'
import {connect} from 'react-redux'
import Section from '../section'
import SectionForm from '../section-form'
import * as section from '../../action/section.js'

class Landing extends React.Component {
  componentWillMount(){
    this.props.sectionCreate({title: 'ready'})
    this.props.sectionCreate({title: 'in progress'})
    this.props.sectionCreate({title: 'done'})
  }
  render(){
    let {
      sections,
      sectionCreate,
    } = this.props


    return (
      <div className='landing'>
        <SectionForm onComplete={sectionCreate} />
        <div className='section-container'>
          {sections.map((section, i) => 
            <Section key={i} section={section} />
          )}
        </div>
      </div>
    )
  }
}

// return objects that will become props for the compoent
let mapStateToProps = (state) => ({
  sections: state.sections,
})

let mapDispatchToProps = (dispatch) => ({
  sectionCreate: (data) => dispatch(section.create(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Landing)


