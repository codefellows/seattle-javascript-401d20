import React from 'react';
import NoteItem from '../note-item';

// is it statefull? NO
// does it have props? YES (notes, removeNote)
class NoteList extends React.Component {
  render(){
    return (
      <ul className='note-list'>
        {this.props.notes.map((note, i) => 
           <NoteItem key={i} note={note} removeNote={this.props.removeNote} />
        )}
      </ul>
    )
  }
}

export default NoteList;
