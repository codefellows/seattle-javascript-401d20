import './_section-form.scss'
import React from 'react'

// does it have state ?  yes
// is app or viewState ? view 
// does it have props ? yes onComplete *section
// does it need props ? yes onComplete

let emptyState  = {
  title: ''
}

class SectionForm extends React.Component {
  constructor(props){
    super(props)
    this.state = this.props.section || emptyState
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e){
    let {value} = e.target
    this.setState({title: value})
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.onComplete(this.state)
    this.setState(emptyState)
  }

  // when this is used as an update form
  //    called each time appstate updates
  //    update the form state to be in sync with the app state
  componentWillReceiveProps(nextProps){
    if(nextProps.section)
      this.setState(nextProps.section)
  }

  render(){
    let buttonText = this.props.section ? 'update section': 'create section'

    return (
      <form 
        onSubmit={this.handleSubmit}
        className='section-form'>

        <input
          type='text'
          name='title'
          placeholder='title'
          value={this.state.title}
          onChange={this.handleChange}
          />

        <button type='submit'> {buttonText} </button>
        
      </form>
    )
  }
}

export default SectionForm
