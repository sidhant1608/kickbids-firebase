import queryString from 'query-string';
import axios from 'axios';


var API = "http://localhost:8000/api";

export const getProducts = (sortBy) => {
    return axios
    .get(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`)
    .then(response => {
        return response.data;
    })
    .catch(err => console.log(err));
};

export const getCategories = () => {
    return axios
    .get(`${API}/categories`)
    .then(response => {
        return response.data;
    })
    .catch(err => console.log(err));
};

export const getFilteredProducts = (skip, limit, filters = {}) => {
    const data = {
        limit, skip, filters
    };
    return axios
    .post(`${API}/products/by/search`, data, {
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json'
        }
      })
      .then(response => {
        return response.data
    })
    .catch(error => {
        console.log(error);
    })
};

export const list = params => {
    const query = queryString.stringify(params);
    return axios.get(`${API}/products/search?${query}`)
    .then(response => {
        return response.data;
    })
    .catch(err => console.log(err));
};

export const read = productId => {

    return axios.get(`${API}/product/${productId}`)
    .then(response => {
        return response.data;
    })
    .catch(err => console.log(err));
};

export const listRelated = (productId) => {

    return axios.get(`${API}/products/related/${productId}`)
    .then(response => {
        return response.data;
    })
    .catch(err => console.log(err));
};

export const createOrder = (data, user, token) => {
    return axios.post(`${API}/razorpay/order/${user._id}`, JSON.stringify(data),{        
        headers: {
        "Content-Type": 'application/json',
        Authorization: `Bearer ${token}`
    }})
    .then(response => {
        return response.data
    })
    .catch(error => {
        console.log(error);
    });
};

export const submitOrder = (data, user, token) => {
    return axios.post(`${API}/razorpay/order/success/${user._id}`, JSON.stringify(data), {
        headers: {
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.data
    })
    .catch(error => {
        console.log(error);
    });
};

export const getOrders = (productId) => {
    return axios.get(`${API}/orders/product/${productId}`).then(response => {
        return response.data;
    }).catch(error => {
        console.log(error);
    });
};

export const getBids = (productId) => {
    // return fetch(`${API}/bids/${productId}`, {
    //     method: 'GET',
    //     headers: {
    //         "Content-Type": 'application/json'
    //     }
    // })
    // .then(response => {
    //     return response.data
    // })
    // .catch(error => {
    //     console.log(error);
    // })

    return axios.get(`${API}/bids/${productId}`)
    .then(response => {
        return response.data
    })
    .catch(error => {
        console.log(error);
    })
};

export const createSell = (authUser, productId, order) => {
    return axios.post(`${API}/orders/create/${productId}`, order, {
        headers: {
            Accept: 'application/json',
            "id-token": `${authUser.idToken}`
        }
    })
    .then(response => {
        return response.data
    })
    .catch(error => {
        console.log(error);
    })
};

export const getOrder = (orderId) => {
    return axios.get(`${API}/orders/${orderId}`).then(response => {
        return response.data;
    }).catch(error => {
        console.log(error);
    });
}

export const placeBid = (idToken, bid, productId) => {
    return axios.post(`${API}/bids/create`, bid, {
        headers: {
            "Content-Type": 'application/json',
            "id-token": `${idToken}`
        }
    }).then(response => {
        return response.data;
    })
    .catch(error => {
        console.log(error);
    })
};


const fileName = req.body.fileName;
const fileType = req.body.fileType;
const productId = req.product._id;
const angle = req.body.angle;


export const uploadPhoto = (idToken, angle, fileName, fileType, productId) => {
    const data = {
        angle: angle,
        fileName: fileName, 
        fileType: fileType
    }
    return axios.post(`${API}/s3/fetch-link/${productId}`, data, {
        headers: {
            "Content-Type": 'application/json',
            "id-token": `${idToken}`
        }
    }).then(response => {
        return response.data;
    })
    .catch(error => {
        console.log(error);
    })
}