




import React from 'react';

export default function Die (props){

  const {is_held, value, id, hold, dice_mode} = props;

  const styles = {
    background: is_held ? 'darkblue' : 'white',
    color: is_held ? 'white' : 'darkblue'
  }



  let all_cube = [];
  for(let i = 1; i <= value; i++){
    all_cube.push(<span> &#9679; </span>)
  }

  return (
    <div style={styles} onClick={() => hold(id)}> 
      {dice_mode ? all_cube : <h2 className='die_number'> {value} </h2>}
    </div>
  )


  
}
