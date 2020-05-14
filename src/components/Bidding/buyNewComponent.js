import React, {useState, useEffect} from 'react';
import {placeBid} from "../API/apiCore";

const BuyNewComponent = (props) => {
    const [bid, setBid] = useState(0);

    const {product, authUser, selectedSize, orders, bids, selectedSizeBids, selectedSizeOrders} = props;

    const condition = 1;

    const setBidPrice = event => {
        setBid(parseInt(event.target.value));
    }

    const submitBid = event => {
        event.preventDefault();
        const bidData = {
            product: product._id,
            price: bid,
            size: selectedSize
        };
        placeBid(authUser.idToken, bidData, product._id)
        .then(data => {
            props.updateData(product._id);
            props.updateSizeData(bid);
        })
        .catch(error => console.log(error));
    }

    if(selectedSizeOrders.length > 0){
        return(
            <div className="bid-container-buysell">
                <div className="bid-container-buysell-put">
                    <div className="filds">
                        <input type="number" id="bid" name="bid" placeholder="Enter your bid:" onChange={setBidPrice}/>
                        <label htmlFor="bid">Enter your bid:</label>
                    </div>
                    <div className="bid-container-buysell-put-button" onClick={submitBid}>SUBMIT BID</div>
                </div>
                <div className="bid-container-buysell-put">
                    <div className="bid-container-buysell-put-sellnow">
                        Buy Now
                    </div>
                </div>
            </div>
        )
    }
    else{
        return(
            <div className="bid-container-buysell-error">
                NO CURRENT SELLERS!
            </div>
        )
    }

}

export default BuyNewComponent;