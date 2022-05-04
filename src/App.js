

import React from 'react';
import Die from './Die';
import Confetti from 'react-confetti'





window.localStorage.setItem('high_score', 10000000)

export default function App () {

  const [all_dice, set_all_dice] = React.useState(all_new_dice());
  const [tenzies, set_tenzies] = React.useState(false);
  const [dice_mode, set_dice_mode] = React.useState(false);
  const [roll_count, set_roll_count] = React.useState(0);





  React.useEffect(() => {

    const all_held = all_dice.every(die => die.is_held);
    const first_value = all_dice[0].value;
    const all_values = all_dice.every(die => die.value === first_value)

    set_tenzies(prev => {
      if(all_values && all_held){
        return true
      }
    })

  }, [all_dice])



  function toggle_dice_mode(){
    set_dice_mode(prev => !prev);
  }



  function all_new_dice (){
    
    let dice = [];
    for(let i = 1; i <= 10; i++){
      dice.push({
          value : Math.ceil(Math.random() * 6),
          is_held : false,
          id : i
      })
    }
    return dice
  }



  function roll_dice(){
    if(tenzies){
      set_all_dice(all_new_dice());
      set_roll_count(0);

      let x = roll_count;
      let y = window.localStorage.getItem('high_score');
      window.localStorage.setItem('high_score', Number(x) < Number(y) ? x : y)

      console.log(window.localStorage)
      return
    }

    set_all_dice(prev => prev.map(die => {
      return die.is_held ? 
        die : 
          {
          ...die,
          value: Math.ceil(Math.random() * 6),
          is_held : false,
        }
    }))

    set_roll_count(prev => prev + 1)
  }



  function hold(id){
    set_all_dice(prev => {
      return prev.map(each => {
        return each.id === id ? {...each, is_held: !each.is_held} : {...each}
      })}
    )
  }



  let dice_elements = all_dice.map(each => {
    return <Die 
              value = {each.value}
              is_held = {each.is_held}
              id = {each.id} 
              hold = {hold} 
              dice_mode = {dice_mode}/>
  });



  return (
    <main>
        <h3> No of Rolls : {roll_count} </h3>
        <h3> High Score : {window.localStorage.getItem('high_score')} rolls </h3>

        {tenzies && <Confetti gravity={0.2}/>}
        <h1> Tenzies Game &#9673; </h1>
        <p> {tenzies ? "You win!" : 'Roll until all dice are the same, click each die to freeze it at its current value between rolls'} </p>
        <article id='button_container'>
          {dice_elements}
        </article>
        <button onClick={roll_dice}> {tenzies ? 'Reset Game' : 'Roll'} </button>
        <button onClick={toggle_dice_mode} className='dice_mode'> {dice_mode ? 'Digits' : 'Dice'} </button>
    </main>
  )
}







