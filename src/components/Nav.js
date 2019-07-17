import React, { useState, useEffect} from "react";
import { Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Message from './Message';

let Nav = () => {

  const [renderDeposit, setRenderDeposit] = useState(null);
  const [value, setValue] = useState('');
  const [message, setmessage] = useState({
    render: false,
    message: "",
  });
  const [logout, setLogout] = useState(false);

  useEffect(() => {
  })

  const encodeFormData = (data) => {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
        .join('&');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!value){return;}

    let username = sessionStorage.getItem('username');
    const token = sessionStorage.getItem("token");

    let dataToSend = {
      melacash: value,
      username: username
    }
    const dataFinished = encodeFormData(dataToSend);

    let response = await fetch('http://localhost:1337/product/addMelaCash', {
      method: 'PUT',
      body: dataFinished,
      headers: {
        'Accept': '*/*',
        "Access-Controll-Allow-origin": "*",
        "Content-type": "application/x-www-form-urlencoded",
        "x-access-token": token,
      },
    });

    let data = await response.status;
    if (response.status == 204) {
      setmessage({
        render: true,
        message: value + '$ has been added to your account dear sir!'
      })

      setTimeout(() => {
        setmessage({
          render: false,
          message: "",
        });
      }, 5000);
    }
  }

  function returnDeposit(){
    return(
      <div className="deposit-child">
        <button onClick={() => setRenderDeposit(null)} 
        className="close"></button>
        <form onSubmit={(e) => {
          handleSubmit(e);
          setRenderDeposit(null);
        }}>
          <p>Amount to deposit ($):</p>
          <input onChange={e => setValue(e.target.value)} value={value} type="number" placeholder="500"/>
          <input type="submit" value="Deposit"/>
        </form>
      </div>
    );
  }

  const logoutUser = () => {
    sessionStorage.clear();
    setLogout(true);
  }

  return (
    <div className="nav-wrapper">
      {message.render &&
        <Message message={message.message}/>
      }
      <div className="deposit-parent">
        <button onClick={() => {
            setRenderDeposit(true);
          }}
          className="deposit">
          deposit
        </button>
        { renderDeposit != null && 
            returnDeposit()
        }
      </div>
      <NavLink activeClassName="nav-active" className="nav-link" to="/home">
        Shop
      </NavLink>
      <NavLink activeClassName="nav-active" className="nav-link" to="/inventory">
        Inventory
      </NavLink>
      {
        logout && <Redirect to={'/'}/>
      }
      <button onClick={logoutUser} className="logout">Logout</button>
    </div>
  );
};

export default Nav;
