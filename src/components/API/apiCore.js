import queryString from 'query-string';

var API = "http://localhost:8000/api";

export const getProducts = (sortBy) => {
    return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getCategories = () => {
    return fetch(`${API}/categories`,{
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

export const getFilteredProducts = (skip, limit, filters = {}) => {
    const data = {
        limit, skip, filters
    };
    return fetch(`${API}/products/by/search`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        return response.json()
    })
    .catch(error => {
        console.log(error);
    })
};

export const list = params => {
    const query = queryString.stringify(params);
    return fetch(`${API}/products/search?${query}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const read = productId => {
    return fetch(`${API}/product/${productId}`,{
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

export const listRelated = (productId) => {
    return fetch(`${API}/products/related/${productId}`,{
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

export const createOrder = (data, user, token) => {
    console.log(JSON.stringify(data));
    return fetch(`${API}/razorpay/order/${user._id}`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        return response.json()
    })
    .catch(error => {
        console.log(error);
    });
};

export const submitOrder = (data, user, token) => {
    return fetch(`${API}/razorpay/order/success/${user._id}`, {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        return response.json()
    })
    .catch(error => {
        console.log(error);
    });
};

export const getOrders = (productId) => {
    return fetch(`${API}/orders/product/${productId}`,{
        method: 'GET'
    }).then(response => {
        return response.json();
    }).catch(error => {
        console.log(error);
    });
};

export const getBids = (productId) => {
    return fetch(`${API}/bids/${productId}`, {
        method: 'GET',
        headers: {
            "Content-Type": 'application/json'
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(error => {
        console.log(error);
    })
};

export const createSell = (authUser, productId, order) => {
    return fetch(`${API}/orders/create/${productId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            "id-token": `${authUser.idToken}`
        },
        body: order
    })
    .then(response => {
        return response.json()
    })
    .catch(error => {
        console.log(error);
    })
};

export const getOrder = (orderId) => {
    return fetch(`${API}/orders/${orderId}`,{
        method: 'GET'
    }).then(response => {
        return response.json();
    }).catch(error => {
        console.log(error);
    });
}

export const placeBid = (userId, token, orderId, form) => {
    return fetch(`${API}/bids/${userId}/${orderId}`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: form
    })
    .then(response => {
        return fetch(`${API}/orders/${orderId}/${userId}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: form
        })
        .then(response => {
            return response.json()
        })
        .catch(error => {
            console.log(error);
        })
    })
    .catch(error => {
        console.log(error);
    })
};