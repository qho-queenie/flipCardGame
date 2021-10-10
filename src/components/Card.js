import React from 'react';
import cx from 'classnames'

import './card.scss';

const Card = ({ card, onClick, isFlipped, inactive }) => {
  const { type, image } = card;

  return (
    <div className={cx('Card', { inactive })} >
      <div
        className={cx('Card_cardContainer', { isFlipped })}
        onClick={onClick}
      >
        <div className="Card_face Card_face--front" aria-label={type} />
        <div className="Card_face Card_face--back">{image}</div>
      </div>
    </div >
  )
}

export default Card;
