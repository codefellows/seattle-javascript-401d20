import './_section.scss'
import faker from 'faker'
import React from 'react'
import {connect} from 'react-redux'
import Card from '../card'
import CardForm from '../card-form'
import SectionForm from '../section-form'
import * as card from '../../action/card.js'
import * as section from '../../action/section.js'

class Section extends React.Component {
  componentWillMount(){
    this.props.cardCreate({content: faker.lorem.words(10) , sectionID: this.props.section.id})
    this.props.cardCreate({content: faker.lorem.words(10) , sectionID: this.props.section.id})
    this.props.cardCreate({content: faker.lorem.words(10) , sectionID: this.props.section.id})
    this.props.cardCreate({content: faker.lorem.words(10) , sectionID: this.props.section.id})
  }

  render(){
    let {
      cards,
      section,
      cardCreate,
      sectionUpdate,
      sectionRemove,
    } = this.props

    let sectionCards = cards[section.id]

    return (
      <div className='section'>
        <h2> {section.title} </h2>
        <button className='delete' onClick={() => sectionRemove(section)}> <span> X </span> </button>
        <SectionForm section={section} onComplete={sectionUpdate} />
        <CardForm section={section} onComplete={cardCreate} />

        <main className='card-container'>
          {sectionCards.map((card, i) => 
            <Card card={card} key={i} />
          )}
        </main>
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
  cards: state.cards,
})

let mapDispatchToProps = (dispatch) => ({
  cardCreate: (data) => dispatch(card.create(data)),
  sectionUpdate: (data) => dispatch(section.update(data)),
  sectionRemove: (data) => dispatch(section.remove(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Section)

