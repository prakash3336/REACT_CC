import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios
import './Cart.css'; // Optional: Add a CSS file for Cart-specific styles

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/food')
      .then((res) => {
        setCartItems(res.data);  // Ensure you're accessing `res.data`
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const removeFromCart = (id) => {
    console.log(`Deleting item with id: ${id}`);  // Log the id to verify
    axios.delete(`http://localhost:3000/food`,{
      params:{id}
    })  // Pass the id in the URL
      .then((res) => {                          
        console.log("Item removed", res);

        // Update local state to reflect the removal
        setCartItems(prevData => prevData.filter(item => item.id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item, index) => (
            <div className="cart-item" key={index}>
              <img src={item.image} alt={`Cart Item ${index + 1}`} />
              <h4>{item.name}</h4>
              <p>{item.price}</p>
              <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cart;
