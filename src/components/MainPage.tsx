import React, { useEffect, useState } from 'react';
import './styles/MainPage.css';
import Header from './Header';
import BoxContainer from './BoxContainer';
import axios from 'axios';
import SearchBar from './SearchBar';
import { db } from './firebase';
import { collection, getDoc, doc, setDoc } from 'firebase/firestore';
import CryptoList from './CryptoList';

const MainPage = () => {
  interface DataTypes {
    id: string;
    coinId: string;
    name: string;
    current_price: string;
    total_volume: string;
    market_cap: string;
    image: string;
    price_change_percentage_24h: string;
    symbol: string;
  }

  const [data, setData] = useState<DataTypes[]>([]);
  const [dataLoadFromFirebase, setDataLoadFromFirebase] =
    useState<boolean>(false);
  const [finQuery, setFinQuery] = useState<string>('');
  const [showBox, setShowBox] = useState<boolean>(false);
  const [selectedCriptos, setSelectedCriptos] = useState<string[]>([]);

  const userId = localStorage.getItem('userId') || '';

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false`
      )
      .then(res => {
        setData(res.data);
        console.log(res.data);
      })
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    getUserData();
    setDataLoadFromFirebase(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (dataLoadFromFirebase) {
      saveUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCriptos]);

  const filteredData = data.filter(coin =>
    coin.name.toLowerCase().includes(finQuery)
  );

  type stringe = {
    props: string;
  };

  const handleQuery = (props: stringe) => {
    if (props.props.length > 0) {
      setFinQuery(props.props);
      setShowBox(true);
    } else {
      setShowBox(false);
    }
  };

  const saveUserData = async () => {
    const userRef = collection(db, 'userData');

    if (userId.length > 0) {
      await setDoc(doc(userRef, userId), {
        id: userId,
        item: selectedCriptos,
      });
    }
  };

  const getUserData = async () => {
    if (userId.length > 0) {
      const docRef = doc(db, 'userData', userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setSelectedCriptos(docSnap.data().item);
      } else {
        console.log('No such document!');
      }
    }
  };

  const addSelectedCriptos = (props: string) => {
    setSelectedCriptos(prevArray => [...prevArray, props]);
  };

  const removeSelectedCripto = (props: string) => {
    const temp = selectedCriptos.filter(item => item !== props);
    setSelectedCriptos(temp);
  };

  return (
    <div className="container">
      <div>
        <Header />
      </div>
      <div>
        <SearchBar handleQuery={handleQuery} />
      </div>
      {showBox ? (
        <div className="box-parent">
          {filteredData.map(coin => {
            return (
              <BoxContainer
                addSelectedCriptos={addSelectedCriptos}
                key={coin.id}
                coinId={coin.id}
                name={coin.name}
                price={coin.current_price}
                price_change={coin.price_change_percentage_24h}
                volume={coin.total_volume}
                marketcap={coin.market_cap}
                image={coin.image}
                selectedCriptos={selectedCriptos}
                removeSelectedCripto={removeSelectedCripto}
              />
            );
          })}
        </div>
      ) : null}
      <div className="list-parent">
        {filteredData}
        {filteredData.map(coin => {
          return (
            <CryptoList
              addSelectedCriptos={addSelectedCriptos}
              key={coin.id}
              coinId={coin.id}
              name={coin.name}
              price={coin.current_price}
              volume={coin.total_volume}
              marketcap={coin.market_cap}
              price_change={coin.price_change_percentage_24h}
              image={coin.image}
              symbol={coin.symbol}
              selectedCriptos={selectedCriptos}
              removeSelectedCripto={removeSelectedCripto}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MainPage;
