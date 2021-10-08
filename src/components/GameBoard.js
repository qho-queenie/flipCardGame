import React, { useState, useEffect } from 'react';
import { Card } from './Card'
import '../styles/gameBoard.scss'
import { v4 as uuidv4 } from 'uuid';

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

const createShuffledDeck = deck => {
    deck = [...deck, ...deck];
    let count = deck.length;
    while (count > 0) {
        let randomPick = Math.floor(Math.random() * count);
        count--;
        [deck[count], deck[randomPick]] = [deck[randomPick], deck[count]];
    }
    return deck.map(each => ({ ...each, 'id': uuidv4() }));
}

export const GameBoard = () => {
    const [inactiveCards, setInactiveCards] = useState([]);
    const [disableAllClick, setDisableAllClick] = useState(false);
    const [openCards, setOpenCards] = useState([]);
    const [numberOfMoves, setNumberOfMoves] = useState(0);
    const [cards, setCards] = useState(() =>
        createShuffledDeck(cardPool)
    );

    useEffect(() => {
        if (openCards.length === 2) {
            setDisableAllClick(true);
            setTimeout(() => { evaluate() }, 3500);
            setDisableAllClick(true);
        }
    }, [openCards])

    const restartGame = () => {
        setCards(createShuffledDeck(cardPool));
        setInactiveCards([]);
        setOpenCards([]);
        setNumberOfMoves(0);
    }

    const handleCardClicked = (clickedCardId) => {
        setNumberOfMoves(numberOfMoves => numberOfMoves + 1);
        setOpenCards([...openCards, clickedCardId])
    }

    const checkCardsType = (card1Id, card2Id, deckArray) => {
        let card1Obj = deckArray.filter(card => card.id === card1Id);
        let card2Obj = deckArray.filter(card => card.id === card2Id);
        return (card1Obj[0].type === card2Obj[0].type) ? true : false;
    }

    const evaluate = () => {
        const [card1, card2] = openCards;
        if (checkCardsType(card1, card2, cards)) {
            setInactiveCards([...inactiveCards, card1, card2])
        }
        setDisableAllClick(false);
        setOpenCards([])
    }

    return (
        <React.Fragment>
            <h3>Memory Card Game</h3>
            <h4>Moves: {numberOfMoves}</h4>
            <button
                type="button"
                className='restartGameButton'
                onClick={() => restartGame()}
            >
                Restart Game
            </button>
            <div className={disableAllClick ? 'board disabledClick' : 'board'}>
                {cards.map((card) => {
                    return (
                        <Card
                            card={card}
                            key={card.id}
                            onClick={() => handleCardClicked(card.id)}
                            isFlipped={openCards.includes(card.id)}
                            inactive={inactiveCards.includes(card.id)}
                        />
                    );
                })}
            </div>
        </React.Fragment>
    )
}
