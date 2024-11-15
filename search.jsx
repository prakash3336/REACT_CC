import React, { useState } from 'react';

function Search() {
  const [searchTerm, setSearchTerm] = useState("");

  const restaurants = [
    "Pizza Palace",
    "Burger Barn",
    "Sushi Central",
    "Taco Town",
    "Steak House",
    "Pasta Paradise",
    "Biryani Junction",
    "Salad Spot"
  ];

  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Search Restaurants</h1>
      
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search for restaurants..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <ul className="restaurant-list">
        {filteredRestaurants.map((restaurant, index) => (
          <li key={index} className="restaurant-item">
            {restaurant}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Search;
