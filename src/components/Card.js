import React from 'react';
import classnames from 'classnames'

import './card.scss';

const Card = ({ card, onClick, isFlipped, inactive }) => {
  const { type, image } = card;

  return (
    <div className={classnames('Card', { inactive })} >
      <div
        className={classnames('Card__container', { isFlipped })}
        onClick={onClick}
      >
        <div className='Card_face Card_face--front' aria-label={type} />
        <div className='Card_face Card_face--back'>{image}</div>
      </div>
    </div >
  )
}

export default Card;
