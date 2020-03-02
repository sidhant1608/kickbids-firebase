import React,{useState, useEffect} from 'react';
import {read, listRelated, getOrders, getBids} from "../API/apiCore";
import {API, PHOTOS, SIZES} from "../../config";

import "./product.css"

import {
    AuthUserContext
  } from '../Session';

import SellNewComponent from "../Bidding/sellNewComponent";
import BuyNewComponent from "../Bidding/buyNewComponent";

import RowComponent from "../Row/index";

const Product = (props) => {

    const [product, setProduct] = useState({});
    const [error, setError] = useState(false);
    const [selected, setSelected] = useState(0);
    const [category, setCategory] = useState({})
    const [status, setStatus] = useState("basic");
    const [selectedSize, setSelectedSize] = useState(0);

    const [lowAskPrice, setLowAskPrice] = useState(0);
    const [highBidPrice, setHighBidPrice] = useState(0);

    const [relatedProduct, setRelatedProduct] = useState([]);
    const [orders, setOrders] = useState([]);
    const [bids, setBids] = useState([])
    const [selectedSizeOrders, setSelectedSizeOrders] = useState([]);
    const [selectedSizeBids, setSelectedSizeBids] = useState([]); 

    const [firstFlag, setFirstFlag] = useState(true);

    const pullWindowUp = () => {
        if(firstFlag){
            window.scrollTo(0, 0)
            setFirstFlag(false);
        }
    }

    const handleSelected = (key) => {
        setSelected(key);
    }

    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if(data.error){
                setError(data.error);
            } else {
                setProduct(data);
                setCategory(data.category)
                listRelated(data._id).then(data => {
                    if(data.error){
                        setError(data.error);
                    }
                    else {
                        setRelatedProduct(data);
                    }
                })
            }
        });
        getOrders(productId).then(data => {
            if(data.error){
                setError(data.error);
            }
            else {
                setOrders(data);
                getBids(productId).then(data => {
                    if(data.error){
                        setError(data.error);
                    }
                    else{
                        setBids(data);
                    }
                })
            }
        });
    };

    const showError = () => {
        return (
            <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
                {error}
            </div>
        );
    };

    useEffect(() => {
        pullWindowUp();
        const productId = props.match.params.productId;
        if (productId){
            loadSingleProduct(productId);
        }
        var lowAsk = 10000000000000000000000000000000000000
        var highBid = 0
        // if(bids.length > 0){
        //     highBid = bids[0].price
        // }
        // if(orders.length > 0){
        //     lowAsk = orders[0].price
        // }
        var sorders = []
        var sbids = []
        for (var i = 0; i < orders.length; i++){
            if (orders[i].size === selectedSize){
                sorders.push(orders[i]);
                if (orders[i].price <= lowAsk){
                    lowAsk = orders[i].price
                }
            }
        }
        for ( var i = 0; i < bids.length; i++){
            if (bids[i].size === selectedSize){
                sbids.push(bids[i]);
                if(bids[i].price >= highBid){
                    highBid = bids[i].price
                }
            }
        }
        setSelectedSizeOrders(sorders);
        setSelectedSizeBids(sbids);
        setHighBidPrice(highBid);
        if(lowAsk !== 10000000000000000000000000000000000000){
            setLowAskPrice(lowAsk);
        }
        else{
            setLowAskPrice(0);
        }
      },[selectedSize])

    console.log(product, orders, bids, selectedSize, selectedSizeBids, selectedSizeOrders);

    const showProductImage = (product) => {
        if(product._id !== undefined){
            return (
                <img src={`${API}/product/${PHOTOS[selected]}/${product._id}`} className="product-photo-main-image"/>
            )
        }
    }

    const showCategory = () => {
        if(category){
            return (
                <div className="product-name-block-category">
                    {category.name}
                </div>
            )
        }
    };

    const handleSetNew = () => {
        setStatus("new");
    }

    const handleSetOld = () => {
        setStatus("old");
    }

    const showMainBlock = () => {
        if(status==="basic"){
            return(
                <div className="bid-container">
                    <div className="bid-text">
                        CHOOSE AN OPTION:
                    </div>
                    <div className="bid-options-container">
                        <div className="bid-options-container-option new" onClick={handleSetNew}>
                            <div className="options-buysell">
                                BUY/SELL
                            </div>
                            <div className="options-option">
                                NEW
                            </div>
                        </div>
                        <div className="bid-options-container-option old" onClick={handleSetOld}>
                            <div className="options-buysell">
                                BUY/SELL
                            </div>
                            <div className="options-option">
                                OLD
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        else if(status==="new"){
            return (
                <div className="bid-container">
                    {showShoeSizes()}
                    {displayOnSelectSize()}
                </div>
            )
        }
    }

    const displayOnSelectSize = () => {
        if(selectedSize !== 0){
            return (
                <>
                <div className="bid-container-buysell-info">
                    <div className="info-block">
                        <label>
                            Lowest Ask:
                        </label>
                        <label>
                            ₹{lowAskPrice}
                        </label>
                     </div>
                     <div className="info-block">
                        <label>
                            Highest Bid: 
                        </label>
                        <label>
                            ₹{highBidPrice}
                        </label>
                     </div>
                </div>
                <AuthUserContext.Consumer>
                {authUser => (
                    <>
                    <BuyNewComponent 
                        product={product} 
                        authUser={authUser} 
                        selectedSize={selectedSize}
                        orders={orders}
                        bids={bids}
                        selectedSizeOrders={selectedSizeOrders}
                        selectedSizeBids={selectedSizeBids}
                        updateData={loadSingleProduct}/>
                    <SellNewComponent 
                        product={product} 
                        authUser={authUser} 
                        selectedSize={selectedSize}
                        orders={orders}
                        bids={bids}
                        selectedSizeOrders={selectedSizeOrders}
                        selectedSizeBids={selectedSizeBids}
                        updateData={loadSingleProduct}/>
                    </>
                )}
            </AuthUserContext.Consumer>
            </>
            )
        }
    }

    const onSelectSize = event => {
        setSelectedSize(parseInt(event.target.value));
    }

    const displayRelatedProducts = () => {
        if(relatedProduct.length > 0){
            return (
                <RowComponent products={relatedProduct} text={"Related"}/>
            )
        }
    }
    
    const showShoeSizes = () => {
        return (
            <div className="product-details-block-size">
                <select onChange={onSelectSize} className="select-text" defaultValue="">
                    <option value="" disabled></option>
                     {SIZES && SIZES.map((size, i) =>(
                    <option key={i} value={size}>{size}</option>
                    ))}
                </select>
                <span className="select-highlight"></span>
                <span className="select-bar"></span>
                <label className="select-label">SELECT A SIZE</label>
            </div>
        )
    }

    if(product){
        return (
            <>
            <div className="product-main">
                <div className="product-name-block">
                    <div className="product-name-block-title">
                        {product.name}
                    </div>
                    {showCategory()}
                </div>
                <div className="product-photos-block">
                    <div className="product-photos-selector">
                        {PHOTOS.map((photoURL, i) => (
                            <Selector 
                                key={i} 
                                url={photoURL} 
                                product={product}
                                data={i}
                                handleSelected={handleSelected}/>
                        ))}
                    </div>
                    {showProductImage(product)}
                </div>
                <div className="product-details-block">
                    <div className="product-details-block-description">
                        {product.description}
                    </div>
                    <div className="product-details-block-main">
                        {showMainBlock()}
                    </div>
                    <div className="product-details-block-details">
                        <div className="product-details-block-details-price">
                            Price: {product.price}
                        </div>
                        <div className="product-details-block-details-created">
                            Added Date: {product.createdAt}
                        </div>
                    </div>
                </div>
            </div>
            {displayRelatedProducts()}
            </>
        )
    }
}

export default Product;

const Selector = (props) => {

    const showSelectorImage = (url,product) => {
        if(product._id !== undefined){
            return (
                <img src={`${API}/product/${url}/${product._id}`}/>
            )
        }
    }

    const handleClick = () => {
        props.handleSelected(props.data);
    }
    return (
        <div className="product-photos-selector-photo" onClick={handleClick}>
            {showSelectorImage(props.url, props.product)}
        </div>
    )
}