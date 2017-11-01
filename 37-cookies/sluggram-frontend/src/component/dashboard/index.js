import React from 'react'
import SmartForm from '../smart-form'

let handleValidate = ({name, value}) => {
  switch(name){
    case 'lulwat':
      if(value.length < 5)
        return 'lulwat must have a at least 5 chars'
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
          data={{who: 'l'}} 
          onComplete={console.log} 
          onValidate={handleValidate}>

          <input 
            name='lulwat' 
            placeholder='lulwat'
            required
            />
          <input 
            name='yord' 
            placeholder='yord'
            type='number'
            />
          <input 
            name='wat' 
            placeholder='yord'
            type='checkbox'
            />

          <textarea name='blorg' />

          <select name='who'>
            <option> ool </option>
            <option> ol </option>
            <option> l </option>
            <option> cool </option>
          </select>
          <button type='submit'> booyea </button>
        </SmartForm>
      </div>
    )
  }
}

export default Dashboard
