import './_card.scss'
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
      <div draggable className='card'>
        <button className='delete' onClick={() => cardRemove(card)}> <span> delete </span> </button>

        <main>
          <p> {card.content} </p>
          <CardForm card={card} onComplete={cardUpdate} />
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
