import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import '../styles/iconsGenerator.scss';


export const IconsGenerator = ({ eachCard, onClick, index }) => {
    const { type, image } = eachCard;
    const [cardIsFlipped, setCard1Flipped] = useState(false);
    const [openCards, setOpenCards] = useState([]);


    const toggleFlipCard = (e) => {
        setCard1Flipped(!cardIsFlipped);
        let justClickedItem = e.target.ariaLabel;
        setOpenCards((prev) => [...prev, justClickedItem]);

    }

    useEffect(() => {
        console.log(openCards, 'openCards in effect')

    }, [openCards]);


    const evaluate = () => {
        const [firstCard, secondCard] = openCards;
        console.log(firstCard, 'firstCard')
        console.log(secondCard, 'secondCard')
    }

    return (
        <div className='tile' >
            <div
                className={cardIsFlipped ? 'card is-flipped' : 'card'}

                onClick={(e) => toggleFlipCard(e)}
            >
                <div className="card__face card__face--front" aria-label={type}></div>

                <div className="card__face card__face--back" >
                    {image}
                </div>
            </div>
        </div >
    )
}