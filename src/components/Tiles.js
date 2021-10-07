import React, { useState, useEffect } from 'react';
import '../styles/tiles.scss'

import { IconsGenerator } from './IconsGenerator';

const shuffle = poolObject => {
    let count = poolObject.length;
    while (count > 0) {
        let randomPick = Math.floor(Math.random() * count)
        count--;

        [poolObject[count], poolObject[randomPick]] = [poolObject[randomPick], poolObject[count]];

    }
    console.log(poolObject, "called many times")
    return poolObject;

}

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


export const Tiles = () => {
    const [cardIsFlipped, setCard1Flipped] = useState(false);
    const [numOfCardsFlipped, setNumOfCardsFlipped] = useState(0);

    // we need to generate the shuffled deck here, instead of in the component because each time the user clicks, the deck re-shuffles
    const [cards, setCards] = useState(() =>
        shuffle([...emojiPool, ...emojiPool])
    );

    const toggleFlipCard = () => {
        if (numOfCardsFlipped < 3) {
            setNumOfCardsFlipped(numOfCardsFlipped => numOfCardsFlipped + 1);
            setCard1Flipped(!cardIsFlipped);

        }
        // 2 cards have been flipped
        // reset numsOfCardsFlipped + remove all card is-flipped classes (turn the 2 flipped cards over)
        else {
            setNumOfCardsFlipped(0);
        }

    }



    return (
        <div className="tile">
            <div
                className={cardIsFlipped ? 'card is-flipped' : 'card'}
                onClick={toggleFlipCard}
            >
                <div className="card__face card__face--front">front</div>

                {/* {cards.map(eachCard => console.log(eachCard))} */}

            </div>

        </div >
    )

}