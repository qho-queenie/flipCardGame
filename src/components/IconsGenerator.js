import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import '../styles/iconsGenerator.scss';


export const IconsGenerator = ({ eachCard, onClick, isFlipped, inactive }) => {
    const { type, image } = eachCard;
    return (

        <div className={inactive ? 'tile disappear' : 'tile'} >
            <div
                className={isFlipped ? 'card is-flipped' : 'card'}

                onClick={onClick}
            >
                <div className="card__face card__face--front" aria-label={type}></div>

                <div className="card__face card__face--back" >
                    {image}
                </div>
            </div>
        </div >
    )
}