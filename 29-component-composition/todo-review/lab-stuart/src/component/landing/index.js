import React from 'react';
import faker from 'faker'


// is it a stateful component? NO
// does it have a parrent? YES
//   does it have props? NO
class Landing extends React.Component {
  render(){
    let content = new Array(5).fill(0).map(() => <p> {faker.lorem.words(10)} </p>)

    return (
      <div className='landing'>
        <h1>Landing</h1>
        <p>Lorem ipsum dolar.</p>
        {content}
      </div>
    )
  }
}

export default Landing;
