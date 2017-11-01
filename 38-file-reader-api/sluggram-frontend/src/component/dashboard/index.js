import React from 'react'
import {connect} from 'react-redux'

import PhotoForm from '../photo-form'
import * as clientPhoto from '../../action/client-photo.js'

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  createPhoto: (photo) => dispatch(clientPhoto.createRequest(photo)),
})

class Dashboard extends React.Component {
  render(){
    return (
      <div className='dashboard'>
        <PhotoForm onComplete={this.props.createPhoto} />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
