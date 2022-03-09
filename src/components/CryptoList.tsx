import React, { ChangeEvent, MouseEventHandler } from 'react';
import './styles/CryptoList.css';

const CryptoList = ({
  name,
  symbol,
  price,
  price_change,
  image,
  volume,
  marketcap,
  coinId,
  addSelectedCriptos,
  selectedCriptos,
  removeSelectedCripto,
}) => {
  const handleStar = (e: React.MouseEvent<HTMLElement>) => {
    const currentId = e.currentTarget.id;
    if (selectedCriptos.includes(currentId)) {
      removeSelectedCripto(currentId);
    } else {
      addSelectedCriptos(currentId);
    }
  };

  const userId = localStorage.getItem('userId') || '';

  return (
    <div className="coin-container">
      <div className="coin-row">
        <div className="coin">
          <img src={image} alt="crypto" />
          <h1>{name}</h1>
          <p className="coin-symbol">{symbol}</p>
        </div>
        <div className="coin-data">
          <p className="coin-price">${price}</p>
          <p className="coin-volume">
            ${volume ? volume.toLocaleString() : 'volume'}
          </p>
          {price_change < 0 ? (
            <p className="coin-percent red">
              {price_change ? price_change.toFixed(2) : ''}%
            </p>
          ) : (
            <p className="coin-percent green">
              {price_change ? price_change.toFixed(2) : ''}%
            </p>
          )}
          <p className="coin-marketcap">
            Mkt Cap: ${marketcap ? marketcap.toLocaleString() : ''}
          </p>
        </div>

        <button id={coinId} className="btn" onClick={handleStar}>
          <img
            className={
              selectedCriptos.includes(coinId) && userId.length > 0
                ? 'star'
                : 'star-off'
            }
            src={require('../assets/star.png')}
            alt="star"
          />
        </button>
      </div>
    </div>
  );
};
export default CryptoList;
