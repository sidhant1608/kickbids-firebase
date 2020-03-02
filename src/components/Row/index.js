import React from 'react';

import Card from "../Card/card";

const RowComponent = (props) => {
    return (
        <div className="main-content-row">
            <div className="row-title">
                {props.text}
            </div>
        <div className="row-cards-container">
            {props.products.map((product, i) => {
                return (
                        <Card  key={i} product={product}/>
                )
            })}
        </div>
    </div>
    )
};

export default RowComponent;