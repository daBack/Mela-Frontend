import React, { useState, useEffect} from "react";
import './../style/product.css';
import Message from './Message';

let Product = ({product, index, loading}) => {

  const encodeFormData = (data) => {
      return Object.keys(data)
          .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
          .join('&');
  }

  const [message, setmessage] = useState({
    render: false,
    message: ''
  });

  const buy = async () => {
    const username = sessionStorage.getItem('username');
    const token = sessionStorage.getItem("token");

    let formData = {
      username: username,
      product: product.product
    }

    console.log(formData);
    
    const dataToSend = encodeFormData(formData)
    let response = await fetch("http://localhost:1337/product/inventory", {
      method: "POST",
      body: dataToSend,
      headers: {
        "Access-Controll-Allow-origin": "*",
        "Content-type": "application/x-www-form-urlencoded",
        'Accept': '*/*',
        'x-access-token': token,
      },
    });

    let data = await response.json();
    console.log(data);
    if (data.message) {
      setmessage({
        render: true,
        message: data.message
      });
    } else {
      setmessage({
        render: true,
        message: data.data.message,
      });
    }
    
    setTimeout(() => {
      setmessage({
        render: false,
        message: "",
      });
    }, 5000);
  }

  return (
    <div className="product-wrapper">
    {message.render &&
      <Message message={message.message}/>
    }
      <img 
        className={ 
          loading 
            ? "product-placeholder-image product-image" 
            : "product-image"
        }
        src={
          "https://lincolnroadmall.com/wp-content/uploads/2015/04/Apple-Black-Logo.jpg"
        }
      />
      <article>
        <p
          className={
            loading ? "product-name product-placeholder-name" : "product-name"
          }
        >
          {product.product}
        </p>
        <p
          className={
            loading
              ? "product-price product-placeholder-price"
              : "product-price"
          }
        >
          {product.price}
        </p>
      </article>
      <button 
        onClick={buy}
        className="product-buy"
        value={product.product}
      >
        {loading ? "Loading...": "Buy"} 
      </button>
    </div>
  );
}

export default Product;