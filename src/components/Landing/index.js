import React, {useState, useEffect} from 'react';
import { compose } from 'recompose';
import {getProducts} from "../API/apiCore";

import { withAuthorization, withEmailVerification } from '../Session';

import RowComponent from "../Row/index";


import "./landing.css"

const Landing = (props) => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    getProducts('sold').then(data => {
        if(data.error){
            setError(data.error);
        } else {
            setProductsBySell(data);
        }
    });
  };

  const loadProductsByArrival = () => {
      getProducts('createdAt').then(data => {
          if(data.error){
              setError(data.error);
          } else {
            console.log(data);
              setProductsByArrival(data);
          }
      });
  };

  useEffect(() => {
      loadProductsBySell();
      loadProductsByArrival();
      
  }, []);
  return (
  <div className="main-container">
    <div className="banner-container">
      <div className="search-container"/>
    </div> 
    <RowComponent products={productsByArrival} text={"Just In"}/>
  </div>
)
}

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(Landing);
