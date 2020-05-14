import React, {useState, useEffect} from 'react';
import {createSell, read} from "../API/apiCore";

const SellNewComponent = (props) => {
    const [ask, setAsk] = useState(0);

    const {product, authUser, selectedSize, orders, bids, selectedSizeBids, selectedSizeOrders} = props;

    const condition = 1;


    const setAskPrice = event => {
        setAsk(parseInt(event.target.value));
    }

    const placeAsk = event => {
        event.preventDefault();
        const order = {
            product: product._id, 
            user: authUser.uid, 
            price: ask,
            size: selectedSize, 
            condition: condition
        };
        var form_data = new FormData();

        for ( var key in order ) {
            form_data.append(key, order[key]);
        };
        createSell(authUser, product._id, form_data)
        .then(data => {
            console.log(data);
            props.updateData(product._id);
            props.updateSizeData();
        })
        .catch(error => console.log(error));
    }

    const sellNow = () => {
        if(selectedSizeBids.length > 0){
            return(
                <div className="bid-container-buysell-put">
                    <div className="bid-container-buysell-put-sellnow">
                        Sell Now
                    </div>
                </div>
            )
        }
    }

    return(
        <div className="bid-container-buysell">
            <div className="bid-container-buysell-put">
            <div className="filds">
                <input type="number" id="ask" name="ask" placeholder="Enter your ask:" onChange={setAskPrice}/>
                <label htmlFor="ask">Enter your ask:</label>
            </div>
                <div className="bid-container-buysell-put-button" onClick={placeAsk}>SUBMIT ASK</div>
            </div>
            {sellNow()}
        </div>
    )

}

export default SellNewComponent;