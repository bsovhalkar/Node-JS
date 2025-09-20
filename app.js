// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:8080/api/products');
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Products List</h1>
      <ul>
        {products.map((p) => (
          <li key={p._id}>
            {p.name} - ${p.price}
          </li>
        ))}
      </ul>
    </div>
  );
}


export default App;
