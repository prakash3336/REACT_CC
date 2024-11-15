import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import './res2.css';
import Login from './Login'
import Signup from './Signup'
import Homepage from './Homepage'
import Cart from './Cart'

function App() {
  const [cartItems, setCartItems] = useState([]);  // Define cartItems state here

  return (
    <Router>
      <div>
        <nav>

          <ul>  
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/cart">Cart</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Homepage cartItems={cartItems} setCartItems={setCartItems} />} /> {/* Pass state */}
          <Route path="/cart" element={<Cart cartItems={cartItems} />} /> {/* Pass cartItems */}
        </Routes>
      </div>
    </Router>
  );
}





// All dish data

  export default App;
