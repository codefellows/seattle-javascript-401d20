import './_card.scss'
import React from 'react'
import {connect} from 'react-redux'
import CardForm from '../card-form'
import * as card from '../../action/card.js'
import * as util from '../../lib/util.js'

// does it need state ? yes
// is app state or view state? view
// what view state does it need? editing
class Card extends React.Component {
  constructor(props){
    super(props)
    this.state = {editing: false}
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  handleUpdate(card){
    this.props.cardUpdate(card)
    this.setState({editing: false})
  }

  render(){
    let { 
      card,
      cardRemove,
      cardUpdate,
    } = this.props


    let {editing} = this.state
    return (
      <div className='card'>
        <button className='delete' onClick={() => cardRemove(card)}> <span> delete </span> </button>

        <main onDoubleClick={() => this.setState({editing: true})}>
          {util.renderIf(!editing, <p > {card.content} </p>)}
          {util.renderIf(editing, 
            <CardForm card={card} onComplete={this.handleUpdate} />)}
        </main>
      </div>
    )
  }
}

let mapStateToProps = (state) => ({})
let mapDispatchToProps = (dispatch) => ({
  cardRemove: (data) => dispatch(card.remove(data)),
  cardUpdate: (data) => dispatch(card.update(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Card)
