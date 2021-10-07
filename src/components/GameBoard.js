import React, { useState } from 'react';
import { IconsGenerator } from './IconsGenerator'
import '../styles/gameBoard.scss'
import { v4 as uuidv4 } from 'uuid';


const shuffle = poolObject => {
    let count = poolObject.length;
    while (count > 0) {
        let randomPick = Math.floor(Math.random() * count)
        count--;

        [poolObject[count], poolObject[randomPick]] = [poolObject[randomPick], poolObject[count]];

    }
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

export const GameBoard = () => {
    const [cards, setCards] = useState(() =>
        shuffle([...emojiPool, ...emojiPool])
    );


    return (
        <div className='board'>
            {cards.map((eachCard, index) => {

                return (
                    <IconsGenerator
                        eachCard={eachCard}
                        key={uuidv4()}
                        index={index}
                    />
                );
            })}
        </div>
    )
}
