import React from 'react';
import './BoxContainer.css';

const BoxContainer = ({ name, price, price_change, image }) => {
  return (
    <div className="box-container">
      <div className="box-child">
        <img src={image} alt="crypto" />
        <label className="crypto-name">{name}</label>
        <label className="crypto-price">{price} $</label>
        <label className="crypto-change">{price_change} %</label>
      </div>
    </div>
  );
};

export default BoxContainer;
