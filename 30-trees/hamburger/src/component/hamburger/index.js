import './_hamburger.scss'
import React from 'react'
import {classToggler} from '../../lib/util.js'

// is this component statefull? yes
// does it have view or app state? view
// what does the state represend? open vs closed
// does this component have props? yes (children)
// does it need props? yes (children)
//
class Hamburger extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      open: false,
    }

    this.toggleOpen = this.toggleOpen.bind(this)
  }

  toggleOpen(){
    this.setState(prevState => ({open: !prevState.open}))
  }

  render(){
    let className = classToggler({ 
      hamburger: true, 
      open: this.state.open,
    })

    return (
      <div className={className}>
        <main>
          {this.props.children}
        </main>
        <button onClick={this.toggleOpen}> = </button>
      </div>
    )
  }
}

export default Hamburger
