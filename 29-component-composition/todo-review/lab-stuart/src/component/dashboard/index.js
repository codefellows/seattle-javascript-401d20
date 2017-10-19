import React from 'react';
import uuidv1 from 'uuid/v1';
import NoteForm from '../note-form';
import NoteList from '../note-list';

// is this stateful component? YES
//   is it app state or view state?  APP
// does it have a parrent? YES
//   does it need props? NO
//   does it have props? YES (route props)
class Dashboard extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      notes: [],
    }

    this.addNote = this.addNote.bind(this);
    this.removeNote = this.removeNote.bind(this);
  }

  // what is add notes responisblity?
  //   takes in an object with a title and content
  //   adds an id, edding, and completed to the object
  //   push the note in to this.state.notes
  addNote(note){
    note.id = uuidv1();
    note.editing = false;
    note.completed = false;
    this.setState(prevState => ({
      notes: [...prevState.notes, note],
    }));
  }

  // what is the responsibility?
  // fillter out a note (remove) from the this.state.notes
  removeNote(note){
    console.log(note);
    this.setState(prevState => ({
      notes: prevState.notes.filter(item => item.id !== note.id)
    }))
  }

  // log the new state on each change
  componentDidUpdate(){
    console.log('__STATE__', this.state);
  }

  render(){
    return (
      <div className='dashboard'>
        <h1>Dashboard</h1>
        <NoteForm onComplete={this.addNote} />
        <NoteList removeNote={this.removeNote} notes={this.state.notes} />
      </div>
    )
  }
}

export default Dashboard;
