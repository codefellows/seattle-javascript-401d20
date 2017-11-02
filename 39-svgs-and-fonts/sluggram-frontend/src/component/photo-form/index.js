import React from 'react'
import * as util from '../../lib/util.js'

// render
// constructor
// handleChange
// handleSumbit
// componentWillReceiveProps


// pristine === value unmodified
// dirty == value modified
// untouched == the filed never been focus
// touched == the field has been blured
class PhotoForm extends React.Component {
  constructor(props){
    super(props)
    this.emptyState = {
      preview: '',
      photo: '',
      photoDirty: false,
      photoError: 'Photo is required.',
      description: '',
      descriptionDirty: false,
      descriptionError: 'Photo is required.',
    }

    this.state = this.emptyState 
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleValidate = this.handleValidate.bind(this)
  }

  // retrun a tool tip message if invalid
  // return null if valid
  handleValidate({type, value, files}){
    switch(type){
      case 'file':
        if(files.length !== 1)
          return 'You must only select one file.'
        let imageType = files[0].type
        let validImageTypes = ['image/png', 'image/jpeg', 'image/jpg']
        if(!validImageTypes.includes(imageType))
          return 'Must be an image of type png or jpeg.'
        return null
      case 'text':
        if(value.length > 100)
          return 'You must have less than 100 charicters.'
        return null
      default: 
        return null
    }
  }

  handleChange(e){
    let {type, value, files} = e.target
    if(type === 'file'){
      // validate that only one file was selected
      // validate that the file is an image
      // generate a preview of the file
      let error = this.handleValidate(e.target)
      if(!error) {
        util.fileToDataURL(files[0]) 
        .then(preview => this.setState({preview}))
      }

      console.log('error', error)
      this.setState({
        photo: files[0],
        photoError: error,
        photoDirty: true,
      })
    } else {
      // set description
      this.setState({
        description: value,
        descriptionError: this.handleValidate(e.target),
        descriptionDirty: true,
      })
    }
  }

  handleSubmit(e){
    e.preventDefault()
    //TODO: if theres an error dont call onComplete
    this.props.onComplete(this.state)
    this.setState(this.emptyState)
  }

  render(){
    return (
      <form 
        onSubmit={this.handleSubmit}
        className='photo-form'>
        <img style={{width: '200px'}} src={this.state.preview} />  

        <p> {this.state.photoError} </p>
        <label> Photo </label>
        <input 
          type='file'
          name='photo'
          onChange={this.handleChange}
          />

        <p> {this.state.descriptionError} </p>
        <label> Description </label>
        <input
          type='text'
          name='description'
          value={this.state.description}
          onChange={this.handleChange}
          />

        <button type='submit'> upload photo </button>
      </form>
    )
  }
}

export default PhotoForm
