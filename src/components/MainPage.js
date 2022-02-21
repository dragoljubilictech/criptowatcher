import React, { useEffect, useState } from 'react';
import './MainPage.css';
import Header from './Header';
import BoxContainer from './BoxContainer';
import axios from 'axios';
import SearchBar from './SearchBar';
import { db } from './firebase';
import { collection, getDoc, doc, setDoc } from 'firebase/firestore';

const MainPage = () => {
  const [data, setData] = useState([]);
  const [dataLoadFromFirebase, setDataLoadFromFirebase] = useState(false);
  const [finQuery, setFinQuery] = useState('');
  const [showBox, setShowBox] = useState(false);
  const [selectedCriptos, setSelectedCriptos] = useState([]);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false`
      )
      .then(res => {
        setData(res.data);
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

  const handleQuery = props => {
    if (props.length > 0) {
      setFinQuery(props);
      setShowBox(true);
    } else {
      setShowBox(false);
    }
  };

  const saveUserData = async () => {
    const userRef = collection(db, 'userData');

    await setDoc(doc(userRef, userId), {
      id: userId,
      item: selectedCriptos,
    });
  };

  const getUserData = async () => {
    const docRef = doc(db, 'userData', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setSelectedCriptos(docSnap.data().item);
      console.log(docSnap.data().item);
    } else {
      console.log('No such document!');
    }
  };

  const addSelectedCriptos = props => {
    setSelectedCriptos(prevArray => [...prevArray, props]);
  };

  const removeSelectedCripto = props => {
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
                image={coin.image}
                selectedCriptos={selectedCriptos}
                removeSelectedCripto={removeSelectedCripto}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default MainPage;
