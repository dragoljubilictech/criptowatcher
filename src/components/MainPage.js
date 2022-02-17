import React, { useEffect, useState } from 'react';
import './MainPage.css';
import Header from './Header';
import BoxContainer from './BoxContainer';
import axios from 'axios';
import SearchBar from './SearchBar';

const MainPage = () => {
  const [data, setData] = useState([]);
  const [finQuery, setFinQuery] = useState('');
  const [showBox, setShowBox] = useState(false);

  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`
  //     )
  //     .then(res => {
  //       setData(res.data);
  //     })
  //     .catch(error => console.log(error));
  // }, []);

  const filteredData = data.filter(coin =>
    coin.name.toLowerCase().includes(finQuery)
  );

  const handleQuery = props => {
    setFinQuery(props);
    setShowBox(true);
  };

  return (
    <div className="container">
      <div>
        <Header />
      </div>
      <SearchBar handleQuery={handleQuery} />

      {showBox ? (
        <div className="box-parent">
          {filteredData.map(coin => {
            return (
              <BoxContainer
                key={coin.id}
                name={coin.name}
                price={coin.current_price}
                price_change={coin.price_change_percentage_24h}
                image={coin.image}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default MainPage;
