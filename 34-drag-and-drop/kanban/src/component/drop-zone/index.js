import './_drop-zone.scss'
import React from 'react'

class DropZone extends React.Component {
  constructor(props){
    super(props)

    this.handleDrop = this.handleDrop.bind(this)
    this.handleDragOver = this.handleDragOver.bind(this)
  }

  handleDragOver(e){
    e.preventDefault()
  }

  handleDrop(e){
    try {
      let data = JSON.parse(e.dataTransfer.getData('application/json'))
      this.props.onComplete(data)
    } catch (err) {
      console.log('__BAD DRAG DATA__', err)
    }
  }

  render(){
    return (
      <div 
        className='drop-zone'
        onDragOver={this.handleDragOver} 
        onDrop={this.handleDrop}>

        {this.props.children}
      </div>
    )
  }
}

export default DropZone
