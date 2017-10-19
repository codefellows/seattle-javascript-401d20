import React from 'react';

// it it stateful? YES
// is it view or app state? VIEW
// does it have props? YES (onComplete)
// does it need props? YES (onComplete)
class NoteForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      content: '',
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // when does this get invoked? when the form is summited
  // what should it accomplish?
  //   * preventDefault
  //   * pass the form state into this.props.onComplete
  //   * reset the form state (clear the form)
  handleSubmit(e){
    e.preventDefault();
    this.props.onComplete({...this.state});
    this.setState({title: '', content: ''});
  }

  // update the NoteForm state when an input is changed
  handleChange(e){
    let {name, value} = e.target;
    this.setState({[name]: value});
  }

  render(){
    return (
      <form
        className='note-form'
        onSubmit={this.handleSubmit}
        >

        <input
          type='text'
          name='title'
          placeholder='title'
          value={this.state.title}
          onChange={this.handleChange}
          />

        <input
          type='text'
          name='content'
          placeholder='content'
          value={this.state.content}
          onChange={this.handleChange}
          />

        <button type='submit'>Create Note</button>
      </form>
    )
  }
}

export default NoteForm;
