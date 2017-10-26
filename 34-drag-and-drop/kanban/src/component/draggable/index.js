import React from 'react'
import dragPhoto from '../../asset/icon/drag.png'
//console.log('dragPhoto', dragPhoto)

let image = document.createElement('img')
image.src = dragPhoto

class Draggable extends React.Component {
  constructor(props){
    super(props)
    this.handleDragStart = this.handleDragStart.bind(this)
  }
  
  handleDragStart(e){
    e.dataTransfer.setData('application/json', JSON.stringify(this.props.data))
    e.dataTransfer.setDragImage(image, 200, 200)
    
  }

  render(){
    return (
      <div draggable onDragStart={this.handleDragStart}>
        {this.props.children}
      </div>
    )
  }
}

export default Draggable
