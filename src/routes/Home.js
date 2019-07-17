import React, { useEffect, useState} from 'react';
import { Redirect } from 'react-router-dom';
import io from 'socket.io-client';
import Nav from '../components/Nav';
import Product from '../components/Product';
import Message from '../components/Message';

const Home = () => {
  const socket = io("http://localhost:1337");
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([
    {
      product: "product name",
      price: "product price",
    },
    {
      product: "product name",
      price: "product price",
    },
    {
      product: "product name",
      price: "product price",
    },
  ]);

  const encodeFormData = (data) => {
      return Object.keys(data)
          .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
          .join('&');
  }

  const [tokenExists, setTokenExists] = useState(null);
  const fetchProducts = async () => {
    const token = sessionStorage.getItem('token');
    console.log(token);
    
    
    if (!token) {
      await setTokenExists(false);
      socket.close();
    } else {
      let response = await fetch("http://localhost:1337/product/", {
        method: "get",
        headers: {
          Accept: "*/*",
          "Access-Controll-Allow-origin": "*",
          "Content-type": "application/x-www-form-urlencoded",
          "x-access-token": token,
        },
      });

      let data = await response.json();
      let dataArray = data.data.products;
      let productArray = [];

      dataArray.forEach(product => {
        productArray.push({
          product: Object.keys(product)[0],
          price: product[Object.keys(product)],
        });
      });

      setProducts(productArray);
      setLoading(false);
    }
    
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    return function cleanup() {
      console.log('Closing socket');
      
      socket.close();
    }
  }, []);


  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected to server");
    });

    socket.on("disconnect", () => {
      console.log("disconnected from server");
    });

    socket.on("data", message => {
      console.log(message);
      
      setProductFromSocket(message);
    });
  }, []);

  const setProductFromSocket = (message) => {
    let productArray = [];
    let products = message.products
    if (products) {
      products.forEach(product => {
        productArray.push({
          product: product.product,
          price: product.price
        });
      });
    
      setProducts(productArray);
    }
  }

  return (
    <div className="home-wrapper">
      <Nav/>
      <div className="product-outer-wrapper">
        {products.map((product, index) => (
          <Product key={index} index={index} product={product} loading={loading} />
        ))}
      </div>
      {tokenExists == false &&
        <Redirect to='/'/>
      }
    </div>
  );
}

export default Home;
