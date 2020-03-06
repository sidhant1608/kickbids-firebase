import React from 'react';
import { Link } from 'react-router-dom';

import {API} from "../../config";
import "./card.css";

const Card = ({
    product
  }) => {
    console.log(product);
    return (
        <div className="card-container">
            <div className="card-container-body">
                <Link to={`/product/${product._id}`}>
                    <div className="image-container">
                        <img src={product.photo} 
                        alt={product.name}
                        style={
                            {
                                maxHeight: '100%',
                                maxWidth: '100%'
                            }
                        }></img>
                    </div>
                    <div className="text-container">
                        <div className="product-name">
                            {product.name}
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Card;