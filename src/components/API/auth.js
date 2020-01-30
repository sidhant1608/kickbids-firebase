var API = "http://localhost:8000/api";

//----------------------- FIREBASE API's ------------------------------

export const firesignup = user => {
    console.log(`${API}/firesignup`);
    return fetch(`${API}/firesignup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json()
    })
    .catch(error => {
        console.log(error);
    })
};


export const fireuser = id => {
    return fetch(`${API}/fireuser/${id}`, {
        method: 'GET'
    })
    .then(response => {
        return response.json()
    })
    .catch(error => {
        console.log(error);
    })
};


// export const firesignin = user => {
//     return fetch(`${API}/signin`, {
//         method: 'POST',
//         headers: {
//             Accept: 'application/json',
//             "Content-Type": 'application/json'
//         },
//         body: JSON.stringify(user)
//     })
//     .then(response => {
//         return response.json()
//     })
//     .catch(error => {
//         console.log(error);
//     })
// };


export const getFireusers = (limit) => {
    return fetch(`${API}/fireusers?limit=10`, {
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


// export const fireauthenticate = (data, next) => {
//     if(typeof(window) !== 'undefined'){
//         localStorage.setItem('jwt',JSON.stringify(data));
//         next();
//     }
// };

// export const fireisAuthenticated = (next) => {
//     if ( typeof window === 'undefined'){
//         return false;
//     }
//     if ( localStorage.getItem('jwt')){
//         return JSON.parse(localStorage.getItem('jwt'));
//     } else {
//         return false;
//     }
// }

export const createCategory = (idToken, category) => {
    return fetch(`${API}/category/create`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json',
            "id-token": `${idToken}`
        },
        body: JSON.stringify(category)
    })
    .then(response => {
        return response.json()
    })
    .catch(error => {
        console.log(error);
    })
};

export const createProduct = (idToken,  product) => {
    return fetch(`${API}/product/create`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            "id-token": `${idToken}`
        },
        body: product
    })
    .then(response => {
        return response.json()
    })
    .catch(error => {
        console.log(error);
    })
};