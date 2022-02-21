import React, { useState } from 'react';
import './BoxContainer.css';

const BoxContainer = ({
  name,
  price,
  price_change,
  image,
  coinId,
  addSelectedCriptos,
  selectedCriptos,
  removeSelectedCripto,
}) => {
  const handleStar = e => {
    const currentId = e.currentTarget.id;
    if (selectedCriptos.includes(currentId)) {
      removeSelectedCripto(currentId);
      console.log('Deleted', currentId);
    } else {
      console.log('nije u nizu, dodajem...', currentId);
      addSelectedCriptos(currentId);
    }
  };

  return (
    <div className="box-container">
      <div className="box-child">
        <div className="img-button">
          <img src={image} alt="crypto" />
          <button id={coinId} className="btn" onClick={handleStar}>
            <img
              className={selectedCriptos.includes(coinId) ? 'star' : 'star-off'}
              src={require('../assets/star.png')}
              alt="star"
            />
          </button>
        </div>
        <label className="crypto-name">{name}</label>
        <label className="crypto-price">{price} $</label>
        <label className="crypto-change">{price_change} %</label>
      </div>
    </div>
  );
};

export default BoxContainer;
