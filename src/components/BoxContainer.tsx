import React from 'react';
import './styles/BoxContainer.css';

type TagProps = {
  name: string;
  price: string;
  marketcap: string;
  image: string;
  coinId: string;
  addSelectedCriptos: Function;
  selectedCriptos: string[];
  removeSelectedCripto: Function;
};

const BoxContainer = (props: TagProps) => {
  const handleStar = (e: React.MouseEvent<HTMLElement>) => {
    const currentId = e.currentTarget.id;
    if (props.selectedCriptos.includes(currentId)) {
      props.removeSelectedCripto(currentId);
    } else {
      props.addSelectedCriptos(currentId);
    }
  };

  const userId = localStorage.getItem('userId') || '';

  return (
    <div className="box-container">
      <div className="box-child">
        <div className="img-button">
          <img src={props.image} alt="crypto" />
          <button id={props.coinId} className="btn" onClick={handleStar}>
            <img
              className={
                props.selectedCriptos.includes(props.coinId) &&
                userId.length > 0
                  ? 'star'
                  : 'star-off'
              }
              src={require('../assets/star.png')}
              alt="star"
            />
          </button>
        </div>
        <label className="crypto-name">{props.name}</label>
        <label className="crypto-price">${props.price}</label>
        <label className="crypto-markecap">
          Mkt Cap: ${props.marketcap.toLocaleString()} %
        </label>
      </div>
    </div>
  );
};

export default BoxContainer;
