import React, { useEffect } from 'react'


import {checkWin } from './Helpers';

 const Popup = ({correctLetters,wrongLetters, selectedWord ,setPlayable,playAgain}) => {
   let finalMessage = '';
   let finalMessageRevealWord = '';
   let playable = true;

   if(checkWin(correctLetters,wrongLetters,selectedWord) === 'win'){
     finalMessage = 'Congratulation ! You Won!';
     playable = false;
   }else if(checkWin(correctLetters,wrongLetters,selectedWord) === 'lose'){
    finalMessage = 'Unfortunately ! You lost';
    finalMessageRevealWord = `Word : ${selectedWord}`;
    playable = false;
   }

  useEffect(() => setPlayable(playable)) ;

    return (
        <div classname="popup-container" style = {finalMessage !== '' ? {display:'flex'} : {}}>
        <div className="popup">
          <h2> {finalMessage}</h2>
          <h3 >{finalMessageRevealWord}</h3>
          <button onClick ={playAgain}>Play Again</button>
        </div>
        </div>
    )
}
export default Popup;