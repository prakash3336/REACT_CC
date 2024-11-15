import React, { useState, useEffect, useNavigate } from 'react';
import axios from 'axios'; // Import axios
import './Homepage.css';

function Homepage({ cartItems, setCartItems }) {
  const dishes = [
    {
      "id":1,
      "image": "https://www.cookwithnabeela.com/wp-content/uploads/2024/02/FrenchFries.webp",
      "name": "French Fries",
      "price": "₹79/-"
    },
    {
      "id":2,
      "image": "https://www.southernliving.com/thmb/3x3cJaiOvQ8-3YxtMQX0vvh1hQw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2652401_QFSSL_SupremePizza_00072-d910a935ba7d448e8c7545a963ed7101.jpg",
      "name": "Pizza",
      "price": "₹249/-"
    },
    {
      "id":3,
      "image": "https://img.freepik.com/premium-photo/bowl-chicken-biryani-with-mint-leaves-side_787273-1828.jpg",
      "name": "Chicken Biryani",
      "price": "₹230/-"
    },
    {
      "id":4,
      "image": "https://png.pngtree.com/thumb_back/fw800/background/20231221/pngtree-movie-night-crunch-crispy-popcorn-chicken-s-bite-sized-snack-appeal-image_15528013.jpg",
      "name": "Chicken Popcorn",
      "price": "₹150/-"
    },
    {
      "id":5,
      "image": "https://images7.alphacoders.com/132/1324353.png",
      "name": "Oreo Milkshake",
      "price": "₹150/-"
    },
    {
      "id":6,
      "image": "https://img.freepik.com/premium-photo/ultra-hd-photography-penne-italian-pasta-with-white-cream-sauce-top_992397-4611.jpg",
      "name": "Pasta",
      "price": "₹89/-"
    },
    {
      "id":7,
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiMW8ArkybBnO4NijYKqdfgT0N6PRl-KsdMA&s",
      "name": "Peri Peri Momos",
      "price": "₹149/-"
    },
    {
      "id":8,
      "image": "https://t3.ftcdn.net/jpg/04/18/04/38/360_F_418043833_ffNKOvraTarqXjqkJ0ouQAlod0viZ9L5.jpg",
      "name": "Cauliflower Fry",
      "price": "₹69/-"
    },
    {
      "id":9,
      "image": "https://www.maggi.in/sites/default/files/srh_recipes/f6f14791459d6873db11a54ee5deea60.jpg",
      "name": "Schezwan Chicken Fried Rice",
      "price": "₹99/-"
    },
    {
      "id":10,
      "image": "https://media.istockphoto.com/id/1334115358/photo/cabbage-manchurian.jpg?s=612x612&w=0&k=20&c=lZvW1lWr03mQszDbx4v59IAnxWacQ_Ti275hjj18hcE=",
      "name": "Gobi Manchurian",
      "price": "₹220/-"
    },
    {
      "id":11,
      "image": "https://t3.ftcdn.net/jpg/06/04/76/86/360_F_604768628_iwNfuszjXEGeTM8V5av4yjzklUhcASHS.jpg",
      "name": "Maggi",
      "price": "₹89/-"
    },
    {
      "id":12,
      "image": "https://img.freepik.com/premium-photo/indian-bread-omelette-omelet-sandwich-served-with-tomato-ketchup-med-up-hen-egg-served-moody-background-selective-focus_466689-56625.jpg",
      "name": "Bread Omelette",
      "price": "₹40/-"
    }
  ];
  const [previsoFood, setPreviousFood] = useState([]);
  // const navigate = useNavigate()
  useEffect(() => {
    // Fetch previous food data on component mount
    axios.get('http://localhost:3000/food')
      .then((res) => {
        setPreviousFood(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [selectedDish, setSelectedDish] = useState(null);

  const openPopup = (dish) => {
    setSelectedDish(dish);
  };

  const closePopup = () => {
    setSelectedDish(null);  // Close the popup
  };

  const addToCart = async (dish) => {
    // Check if the dish already exists in the JSON server
    const isDishExists = previsoFood.some((foodItem) => foodItem.id === dish.id);

    if (!isDishExists) {
      // Use POST to add a new dish to the JSON server
      await axios.post('http://localhost:3000/food', {
        id: dish.id,
        name: dish.name,
        price: dish.price,
        image: dish.image
      })
        .then((response) => {
          console.log("Item added:", response.data);
          setCartItems([...cartItems, dish]);  // Add the selected dish to the cart
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("Item already exists in the cart");
    }
    closePopup()
  };

  return (
    <div className="homepage">
      <h2>Pick Your Dishes</h2>
      <p>Explore our popular dishes and manage your restaurant effectively!</p>
      <section>
        <h3>Popular Dishes</h3>
        <div className="dish-list">
          {dishes.map((dish, index) => (
            <div className="dish" key={index}>
              <img src={dish.image} alt={`Dish ${index + 1}`} />
              <h4>{dish.name}</h4>
              <p className="price">{dish.price}</p>
              <button className="buy-btn" onClick={() => openPopup(dish)}>Buy Now</button>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {selectedDish && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={closePopup}>&times;</span>
            <h4>{selectedDish.name}</h4>
            <p>Price: {selectedDish.price}</p>
            <button className="add-to-cart-btn" onClick={() => addToCart(selectedDish)}>Add to Cart</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Homepage