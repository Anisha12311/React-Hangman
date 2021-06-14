
import React, { useState ,useEffect } from 'react';

import Header from './component/Header';
import Figure from './component/Figure';
import Wrongletters from './component/Wrongletters';
import Words from './component/Words';
import Notification from './component/Notification';
import Popup from './component/Popup';
import './App.css';
import { notificationPopup } from './component/Helpers';


const words = ['play', 'fantastic', 'active', 'wizard','good','awesome','sorry','jogging'];

let selectedWord = words[Math.floor(Math.random() * words.length)];
let playable = true;

const correctLetters = [];
const wrongLetters = [];
function App() {
  const [playable,setPlayable] = useState(true);
  const [showNotification,setShowNotification] = useState(false);
  const [correctLetters ,setCorrectLetters] = useState([]);

  const [wrongLetters ,setWrongLetters] = useState([]);

   useEffect(() => {
     const handleKeydown = event => {
       const { key,keyCode } = event;
       if(playable && keyCode >= 65 && keyCode<= 90){
         const letter = key.toLowerCase();
         if(selectedWord.includes(letter)){
           if(!correctLetters.includes(letter)){
             setCorrectLetters(currentLetters => [...currentLetters,letter]);
           }else{
            notificationPopup(setShowNotification);
           }
           } else{
              if(!wrongLetters.includes(letter)){
               setWrongLetters(wrongLetters => [...wrongLetters,letter])
             }else{
              notificationPopup(setShowNotification)
             }
           }
         }
       }
     
      window.addEventListener('keydown', handleKeydown);

    return () => window.removeEventListener('keydown', handleKeydown);
   },[correctLetters,wrongLetters,playable]);

   function playAgain() {
     setPlayable(true)
     setCorrectLetters([])
      setWrongLetters([])
        const random = Math.floor(Math.random()* words.length);
        selectedWord = words[random];
   }
  return (
   <div>
        
  <Header/>
      <div className = "game-container">
       <Figure wrongLetters = {wrongLetters}/>
       <Wrongletters wrongLetters = {wrongLetters}/>
       <Words selectedWord =  {selectedWord} correctLetters = {correctLetters }/>
       </div>
      <Popup  correctLetters = {correctLetters} 
      wrongLetters = {wrongLetters} selectedWord =  {selectedWord}  setPlayable = {setPlayable } playAgain = {playAgain}/>
      <Notification  showNotification = {showNotification}/>
      </div>
    
  );
}

export default App;
