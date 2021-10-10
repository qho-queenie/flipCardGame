// 1. will use icon as images to match
// 2. how to shuffle the icons on every new play, also need a re-shuffle button attached to it
// 3. flipping cards - can only allow twice, on the 2nd flip need to check if there is a match
// if match --> remove the 2 cards from the UI, make disabled
// if not match --> flip the cards again 
// both of these can be attached to a timer to remove or flip cards again
// 4. make a move count

// bonus: have player decide how many cards to play with 
// bonus2: have player enter name

import React from 'react'

import GameBoard from './GameBoard'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <GameBoard />
      </header>
    </div>
  );
}

export default App;
