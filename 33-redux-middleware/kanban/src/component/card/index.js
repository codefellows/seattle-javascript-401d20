import React from 'react'
import {connect} from 'react-redux'
import CardForm from '../card-form'
import * as card from '../../action/card.js'

class Card extends React.Component {
  render(){
    let { 
      card,
      cardRemove,
      cardUpdate,
    } = this.props

    return (
      <div className='card'>
        <p> {card.content} </p>
        <button onClick={() => cardRemove(card)}> delete </button>
        <CardForm card={card} onComplete={cardUpdate} />
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
