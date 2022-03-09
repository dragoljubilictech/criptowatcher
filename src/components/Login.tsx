import React from 'react';
import { GoogleLogin } from 'react-google-login';

const clientId =
  '414880658880-q90lmecgjkhuck8i511kh78c344c47cs.apps.googleusercontent.com';

function Login(props) {
  const onSuccess = res => {
    console.log('[Login Success] currentUser:', res.profileObj.name);

    return res.profileObj.name ? props.handleUserLogin(res.profileObj) : null;
  };

  const onFailure = res => {
    console.log('[Login failed] res:', res);
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        style={{ marginTop: '100px' }}
        isSignedIn={true}
      />
    </div>
  );
}

export default Login;
