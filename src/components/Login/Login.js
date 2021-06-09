import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from '../../Utils/Common';
import '../../css/Login.css';
import PropTypes from 'prop-types';
import HandleError from '../Common/HandleError'

function Login(props) {
  const [loading, setLoading] = useState(false);
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);

  const handleLogin = () => {
    setError(null);
    setLoading(true);
    axios.post('http://localhost:4000/users/signin', { username: username.value, password: password.value }).then(response => {
      setLoading(false);
      setUserSession(response.data.token, response.data.user);
      props.history.push('/home');
      window.location.reload();
    }).catch(error => {
      setLoading(false);
      setError(error.message);
      if(error) setError("Please verify if Authentication API End point is working");
      else if (error.response.status === 401) setError(error.response.data.message);
      else setError("Please Enter Username and Password. Please try again later.");
    });
  }

  try {
    return (
      <div className="app-page rel">
        { error ? <HandleError error={error} /> :
          <div className="login-form">
            <h2 className="text-center page-title">Log in</h2>       
            <div className="form-group">
                <div className="lbl s20"> Username</div>
                <input className="email" type="text" {...username} autoComplete="username" />
            </div>
            <div className="form-group">
            <div className="lbl s20"> Password</div>
                <input className="email" type="password" {...password} autoComplete="password" />
            </div>
            {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
            <div className="form-group">
                <input  className="btn btn-primary btn-block" type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />
            </div> 
          </div>
        }
      </div>
    );
  } catch (error) {
    return <HandleError error={error} />
  }
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

Login.prototype = {
  history: PropTypes.object.isRequired
}

export default Login;