import React from 'react';
import { GoogleLogout } from 'react-google-login';

const clientId =
  '414880658880-q90lmecgjkhuck8i511kh78c344c47cs.apps.googleusercontent.com';

function Logout(props) {
  const onSuccess = res => {
    alert('Logout made successfully');
    props.handleUserLogout(true);
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </div>
  );
}

export default Logout;
