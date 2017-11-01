import React from 'react';
import SmartForm from '../smart-form';

let handleValidate = ({name, value}) => {
  switch(name){
    case 'something':
      if(value.length < 5)
        return 'something must have at least 5 chars'
      return null
    default:
      return null
  }
}

class Dashboard extends React.Component {
  render(){
    return (
      <div className='dashboard'>
        <h1> hello from Dashboard </h1>
        <SmartForm
          data={{who: 'a'}}
          onComplete={console.log}
          onValidate={handleValidate}>

          <input
            name='something'
            placeholder='something'
            required
            />
          <input
            name='some value'
            placeholder='some number'
            type='number'
            />
          <input
            name='value'
            placeholder='some value'
            type='checkbox'
            />

          <textarea name='hmm' />

          <select name='which'>
            <option> hi </option>
            <option> hello </option>
            <option> ello </option>
            <option> hey </option>
          </select>
          <button type='submit'> greeting </button>
        </SmartForm>
      </div>
    )
  }
}

export default Dashboard
