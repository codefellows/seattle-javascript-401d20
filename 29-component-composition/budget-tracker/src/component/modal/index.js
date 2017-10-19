import React from 'react'

let modalStyles = (props) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: props.show ? 'block' : 'none',
  background: 'blue',
})

let modalMainStyles = {
  position: 'fixed',
  background: 'white',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
}

// is it Stateful? no
// will it have props? yes (show, children)
// does it need props? yes (show, children)
class Modal extends React.Component {
  render(){
    return (
      <div style={modalStyles(this.props)} className='modal'>
        <button onClick={this.props.onClose}> close </button>
        <main style={modalMainStyles} >
          {this.props.children}
        </main>
      </div>
    )
  }
}

export default Modal
