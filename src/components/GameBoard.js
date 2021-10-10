import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import cx from 'classnames'

import Card from './Card'
import './gameBoard.scss'

const cardPool = [
  {
    type: 'faceGrin',
    image: '😃'
  },
  {
    type: 'faceSquint',
    image: '😆'
  },
  {
    type: 'animalOrangutan',
    image: '🦧'
  },
  {
    type: 'faceHalo',
    image: '😇'
  },
  {
    type: 'faceWink',
    image: '😉'
  },
  {
    type: 'animalGorilla',
    image: '🦍'
  },
  {
    type: 'animalPoodle',
    image: '🐩'
  }
  ,
  {
    type: 'animalMouse',
    image: '🐭'
  }
];

const shuffleAndCreateDeck = deck => {
  let count = deck.length;
  while (count > 0) {
    const randomPick = Math.floor(Math.random() * count);
    count--;
    [deck[count], deck[randomPick]] = [deck[randomPick], deck[count]];
  }
  return deck.map(eachCard => ({ ...eachCard, 'id': uuidv4() }));
}

const GameBoard = () => {
  const [inactiveCards, setInactiveCards] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [openedCards, setOpenedCards] = useState([]);
  const [numberOfMoves, setNumberOfMoves] = useState(0);
  const [cards, setCards] = useState(() =>
    shuffleAndCreateDeck([...cardPool, ...cardPool])
  );

  useEffect(() => {
    if (openedCards.length === 2) {
      setDisabled(true);
      setTimeout(() => { evaluate() }, 3500);
    }
  }, [openedCards])

  const restartGame = () => {
    setCards(shuffleAndCreateDeck([...cardPool, ...cardPool]));
    setInactiveCards([]);
    setOpenedCards([]);
    setNumberOfMoves(0);
  }

  const handleCardClicked = (cardId) => {
    setNumberOfMoves(numberOfMoves => numberOfMoves + 1);
    setOpenedCards([...openedCards, cardId]);
  }

  const checkCardInfo = (cardId) => {
    const cardToFind = cards.find(({ id }) => id === cardId);
    return cardToFind;
  }

  const evaluate = () => {
    const [card1, card2] = openedCards;
    if ((checkCardInfo(card1)).type === (checkCardInfo(card2)).type) {
      setInactiveCards([...inactiveCards, card1, card2])
    }
    setDisabled(false);
    setOpenedCards([])
  }

  return (
    <React.Fragment>
      <div className='GameBoard'>
        <div className='GameBoard__gameInfoControl'>
          <h3>Memory Card Game</h3>
          <h4>Moves: {numberOfMoves}</h4>
          <button
            type="button"
            className='GameBoard__restartGameButton'
            onClick={restartGame}
          >
            Restart Game
          </button>
        </div>
        <div className={cx('GameBoard__board', { disabled })}>
          {cards.map((card) => {
            return (
              <Card
                card={card}
                key={card.id}
                onClick={() => handleCardClicked(card.id)}
                isFlipped={openedCards.includes(card.id)}
                inactive={inactiveCards.includes(card.id)}
              />
            );
          })}
        </div>
      </div>
    </React.Fragment>
  )
}

export default GameBoard;
