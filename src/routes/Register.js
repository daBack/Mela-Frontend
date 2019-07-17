import React, { useState, useEffect } from "react";
import Message from '../components/Message';
import { Redirect } from 'react-router-dom';

let Register = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [redirect, setRedirect] = useState(false);

  const encodeFormData = data => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  };

  const registerUser = async (e) => {
    e.preventDefault();
    console.log(!username.length > 0);
    
    if (!username.length > 0 || !password.length > 0) {
      console.log(13513513);
      
      setMessage("Username or Password not provided");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
      return;
    }

    let formData = {
      username: username,
      password: password
    }
    let formToSend = encodeFormData(formData);
    console.log(formToSend);
    
    let response = await fetch("http://localhost:1337/user/register", {
      method: "POST",
      body: formToSend,
      headers: {
        "Access-Controll-Allow-origin": "*",
        "Content-type": "application/x-www-form-urlencoded",
        Accept: "*/*"
      },
    });
    
    let data = await response.json();
    console.log('====================================');
    console.log(data);
    console.log('====================================');

    setMessage(data.data.message);
    setTimeout(() => {
      setMessage(null);
      setRedirect(true);
    }, 3000);
  }
  
  return (
    <div className="register-wrapper">
    {message &&
      <Message message={message}/>
    }
    {redirect &&
      <Redirect to='/'/>
    }
      <form 
        onSubmit={e => registerUser(e)}
        className="register-form">
        <input
          type="text"
          onChange={e => setUsername(e.target.value)}
          value={username}
          placeholder="Username"
        />
        <input
          type="password"
          onChange={e => setPassword(e.target.value)}
          value={password}
          placeholder="Super secret password"
        />
        <input type="submit" value="Create account" />
      </form>
    </div>
  );
};

export default Register;
