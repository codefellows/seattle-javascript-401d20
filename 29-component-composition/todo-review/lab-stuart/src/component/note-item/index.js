import React from 'react';

// is it stateful? NO
// does it have props? YES (key, note, removeNote)
// does it need props? YES (note, removeNote)
class NoteItem extends React.Component {
  render(){
    let {note, removeNote} = this.props
    return (
      <li className='note-item'>
        <h1>{note.title}</h1>
        <p>{note.content}</p>
        <button onClick={() => removeNote(note) }>Delete</button>
      </li>
    )
  }
}

export default NoteItem;
