import React from 'react';

let emptyState = {
  bio: '',
  bioDirty: false,
  bioError: 'Bio is required!',
}
class ProfileForm extends React.Component {
  constructor(props){
    super(props);
    this.state = props.profile ? {...emptyState, ...props.profile} : emptyState;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(props){
    if(props.profile)
      this.setState(props.profile);
  }

  handleChange(e){
    let {value} = e.target;
    this.setState({
      bio: value,
      bioDirty: true,
      bioError: value ? null : emptyState.bioError,
    })
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.onComplete(this.state);
    this.setState(emptyState);
  }


  render(){
    return (
      <form
        className='profile-form'
        onSubmit={this.handleSubmit}>

        <textarea
          name='bio'
          value={this.state.bio}
          onChange={this.handleChange}
          />

        <button type='submit'> {this.props.profile ? 'update' : 'create'} profile </button>
      </form>
    )
  }
}

export default ProfileForm
