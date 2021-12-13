import logo from './logo.svg';
import './App.css';
import {   Routes,  Route } from 'react-router-dom'
import Product from './pages/products'
import ProductD from './pages/product-details'
import React from 'react';

function App() {
  return (
    <React.Fragment>   
      <Routes>
        <Route index element={<Product />} />
        <Route path="teams" element={<ProductD />}/>
      </Routes>
      </React.Fragment>
 
  );
}

export default App;
