import './_section.scss'
import faker from 'faker'
import React from 'react'
import {connect} from 'react-redux'
import Card from '../card'
import CardForm from '../card-form'
import SectionForm from '../section-form'
import * as card from '../../action/card.js'
import * as section from '../../action/section.js'
import * as util from '../../lib/util.js'
import DropZone from '../drop-zone'

// has editing view state
class Section extends React.Component {
  constructor(props){
    super(props)
    this.state = {editing: false}
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  handleUpdate(section){
    this.props.sectionUpdate(section)
    this.setState({editing: false})
  }

  componentWillMount(){
    this.props.cardCreate({content: faker.lorem.words(10) , sectionID: this.props.section.id})
    this.props.cardCreate({content: faker.lorem.words(10) , sectionID: this.props.section.id})
  }

  render(){
    let {
      cards,
      section,
      cardCreate,
      cardUpdateSection,
      sectionUpdate,
      sectionRemove,
    } = this.props

    let {editing} = this.state
    let sectionCards = cards[section.id] 
    console.log({cards})
    console.log(sectionCards)


    return (
      <div className='section'>
        {util.renderIf(!editing, 
          <div>
            <h2 onDoubleClick={() => this.setState({editing: true})}> {section.title} </h2>
            <button className='delete' 
              onClick={() => sectionRemove(section)}> <span> X </span> 
            </button>
          </div>
        )}

        {util.renderIf(editing, 
          <SectionForm section={section} onComplete={this.handleUpdate} />)}

        <CardForm section={section} onComplete={cardCreate} />

        <DropZone onComplete={(card) => cardUpdateSection(card, section.id)}>
          <main className='card-container'>
            {sectionCards.map((card, i) => 
              <Card card={card} key={i} />
            )}
          </main>
        </DropZone>
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
  cards: state.cards,
})

let mapDispatchToProps = (dispatch) => ({
  cardCreate: (data) => dispatch(card.create(data)),
  cardUpdateSection: (data, sectionID) => dispatch(card.updateSectionID(data, sectionID)),
  sectionUpdate: (data) => dispatch(section.update(data)),
  sectionRemove: (data) => dispatch(section.remove(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Section)

