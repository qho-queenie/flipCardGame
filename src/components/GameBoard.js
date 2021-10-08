import React, { useState, useEffect, Fragment } from 'react';
import { IconsGenerator } from './IconsGenerator'
import '../styles/gameBoard.scss'
import { v4 as uuidv4 } from 'uuid';

const emojiPool = [
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

const createShuffledDeck = poolObject => {
    poolObject = [...poolObject, ...poolObject];
    console.log(poolObject)
    let count = poolObject.length;
    while (count > 0) {
        let randomPick = Math.floor(Math.random() * count)
        count--;
        [poolObject[count], poolObject[randomPick]] = [poolObject[randomPick], poolObject[count]];
    }
    return poolObject.map(each => ({ ...each, 'id': uuidv4() }));
}

// there can only be 2 in openCards before evaluation
// there is always even number of cards in inactiveCards
export const GameBoard = () => {
    const [inactiveCards, setInactiveCards] = useState([]);
    const [disableAllClick, setDisableAllClick] = useState(false);
    const [openCards, setOpenCards] = useState([]);
    const [numberOfMoves, setNumberOfMoves] = useState(0);
    const [cards, setCards] = useState(() =>
        createShuffledDeck(emojiPool)
    );

    const restartGame = () => {
        // reShuffle and render deck
        setCards(createShuffledDeck(emojiPool));

        // clear everything in all stateS
        // clear inactive cards
        setInactiveCards([]);

        // clear open cards
        setOpenCards([]);

        // clear moves number
        setNumberOfMoves(0);
    }

    const handleCardClicked = (clickedCardId) => {
        setNumberOfMoves(numberOfMoves => numberOfMoves + 1);
        setOpenCards([...openCards, clickedCardId])
    }

    const checkCardsType = (card1id, card2id, poolObj) => {
        let card1Obj = poolObj.filter(card => card.id === card1id);
        let card2Obj = poolObj.filter(card => card.id === card2id);
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
    useEffect(() => {
        console.log(inactiveCards)
    }, [inactiveCards])

    useEffect(() => {
        if (openCards.length === 2) {
            setDisableAllClick(true);
            setTimeout(() => { evaluate() }, 3500);
            setDisableAllClick(true);
        } else if (openCards.length > 2) {
            // this cant happen but if it does, remove the lastly added card
        }
    }, [openCards])

    return (
        <React.Fragment>
            <h3>Memory Card Game</h3> <h4>Moves: {numberOfMoves}</h4>
            <button type="button" className='restartGameButton' onClick={() => restartGame()}>Restart Game </button>
            <div className={disableAllClick ? 'board disabledClick' : 'board'}>
                {cards.map((eachCard) => {
                    return (
                        <IconsGenerator
                            eachCard={eachCard}
                            key={eachCard.id}
                            onClick={() => handleCardClicked(eachCard.id)}
                            isFlipped={openCards.includes(eachCard.id)}
                            inactive={inactiveCards.includes(eachCard.id)}
                        />
                    );
                })}
            </div>
        </React.Fragment>
    )
}
