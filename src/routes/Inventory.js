import React, { useEffect, useState } from 'react';
import Nav from "../components/Nav";
import { Redirect } from "react-router-dom";
import Message from "../components/Message";

const Inventory = () => {

  const [melacash, setMelacash] = useState('N/A')
  const [products, setProducts] = useState([
    {product: 'Iphone', inventoryID: ''},
    {product: 'Imac', inventoryID: ''},
    {product: 'Ipad', inventoryID: ''},
    {product: 'Ipod', inventoryID: ''},
    {product: 'IPoop', inventoryID: ''}
  ])

  const [tokenExists, setTokenExists] = useState(null);
  const [message, setMessage] = useState(null);
  const token = sessionStorage.getItem('token');
  const username = sessionStorage.getItem('username');
  
  useEffect(() => {
    retrieveInventory();
  }, []);

  const retrieveInventory = async () => {

    if (!token) {
      await setTokenExists(false);
    } else {
    
      let response = await fetch(
        "http://localhost:1337/product/inventory/" + username,
        {
          method: "get",
          headers: {
            Accept: "*/*",
            "Access-controll-Allow-Origin": "*",
            "Content-type": "application/x-www-form-urlencoded",
            "x-access-token": token,
          },
        }
      );

      let data = await response.json();
      console.log(data);
      setMelacash(data.data.melacash);

      let productArray = [];
      data.data.products.forEach(product => {
        productArray.push({
          product: product[Object.keys(product)],
          inventoryID: Object.keys(product)[0],
        });
      });
      console.log(productArray);
      setProducts(productArray);
    }
  }

  const encodeFormData = (data) => {
      return Object.keys(data)
          .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
          .join('&');
  }

  const handleSell = async (e, product) => {
    console.log(e.target.value);

    const formData = {
      username: username,
      inventoryID: e.target.value
    }
    const formDataToSend = encodeFormData(formData);

    let response = await fetch("http://localhost:1337/product/inventory", {
      method: "delete",
      body: formDataToSend,
      headers: {
        Accept: "*/*",
        "Access-Controll-Allow-origin": "*",
        "Content-type": "application/x-www-form-urlencoded",
        "x-access-token": token,
      },
    });
    
    let status = await response.status;
    if (status === 200) {
      setMessage('The ' + product + ' has been sold');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }

    retrieveInventory();
  }

  return (
    <div className="inventory-wrapper">
      <Nav />
      { message &&
        <Message message={message} />
      }
      <div className="inventory-list-wrapper">
      <div className="inventory-header-wrapper">
        <h1>Inventory</h1>
        <h3>Melacash: <span className={message ? 'colors-animate cash-span' : 'cash-span'}>${melacash}</span></h3>
      </div>
        <ul className="inventory-ul">
          {products.map((product, index) => (
            <div key={index} className="inventory-li-wrapper">
              <li className="inventory-li">
                <p>{product.product}</p>{" "}
                <button onClick={(e) => handleSell(e, product.product)} value={product.inventoryID}>
                  {product.inventoryID === '' ? 'Loading...' : 'Sell'}
                </button>
              </li>
            </div>
          ))}
        </ul>
      </div>
      {tokenExists == false && <Redirect to="/" />}
    </div>
  );
}

export default Inventory;
