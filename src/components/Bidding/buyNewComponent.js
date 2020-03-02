import React, {useState, useEffect} from 'react';

const BuyNewComponent = (props) => {
    const [bid, setBid] = useState(0);

    const {product, authUser, selectedSize, orders, bids, selectedSizeBids, selectedSizeOrders} = props;

    const condition = 1;

    const setBidPrice = event => {
        setBid(parseInt(event.target.value));
    }

    const placeBid = event => {
        event.preventDefault();
        // const order = {
        //     product: product._id, 
        //     user: authUser.uid, 
        //     price: ask,
        //     size: selectedSize, 
        //     condition: condition
        // };
        // var form_data = new FormData();

        // for ( var key in order ) {
        //     form_data.append(key, order[key]);
        // };
        // createSell(authUser, product._id, form_data)
        // .then(data => {
        //     props.updateData(product._id);
        // })
        // .catch(error => console.log(error));
    }

    if(selectedSizeOrders.length > 0){
        return(
            <div className="bid-container-buysell">
                <div className="bid-container-buysell-put">
                    <div className="filds">
                        <input type="number" id="bid" name="bid" placeholder="Enter your bid:" onChange={setBidPrice}/>
                        <label htmlFor="bid">Enter your bid:</label>
                    </div>
                    <div className="bid-container-buysell-put-button" onClick={placeBid}>SUBMIT BID</div>
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