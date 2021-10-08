import React from 'react';
import '../styles/card.scss';

export const Card = ({ card, onClick, isFlipped, inactive }) => {
    const { type, image } = card;

    return (
        <div className={inactive ? 'cardContainer disappear' : 'cardContainer'} >
            <div
                className={isFlipped ? 'card is-flipped' : 'card'}
                onClick={onClick}
            >
                <div className="card__face card__face--front" aria-label={type}></div>
                <div className="card__face card__face--back">{image}</div>
            </div>
        </div >
    )
}

