import React, { useState } from 'react';
import './Header.css';
import Login from './Login';
import Logout from './Logout';

const Header = () => {
  const [user, setUser] = useState('');
  const [showUser, setShowUser] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [showLogout, setShowLogout] = useState(false);

  const handleUserLogin = props => {
    if (props) {
      setUser(props);
      setShowUser(true);
      setShowLogin(false);
      setShowLogout(true);
    }
  };
  const handleUserLogout = props => {
    if (props) {
      setUser('');
      setShowUser(false);
      setShowLogout(false);
      setShowLogin(true);
    }
  };

  return (
    <div className="header">
      <div className="logo">Logo</div>
      {showUser ? <div className="username">{user}</div> : null}
      <div className="logForm">
        {showLogin ? (
          <div className="login">
            <Login handleUserLogin={handleUserLogin} />
          </div>
        ) : null}

        {showLogout ? (
          <div className="logout">
            <Logout handleUserLogout={handleUserLogout} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
