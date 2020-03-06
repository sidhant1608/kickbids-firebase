import axios from 'axios';

var API = "http://localhost:8000/api";


//----------------------- FIREBASE API's ------------------------------

export const firesignup = user => {
    return axios.post(`${API}/firesignup`, JSON.stringify(user), {
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json'
        }
    })
    .then(response => {
        return response.data;
    })
    .catch(error => {
        console.log(error);
    })
};


export const fireuser = id => {
    return axios.get(`${API}/fireuser/${id}`)
    .then(response => {
        return response.data;
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
//         return response.data;
//     })
//     .catch(error => {
//         console.log(error);
//     })
// };


export const getFireusers = (limit) => {
    return axios.get(`${API}/fireusers?limit=10`)
    .then(response => {
        return response.data;;
    })
    .catch(err => console.log(err));
};

export const getCategories = () => {
    return axios.get(`${API}/categories`)
    .then(response => {
        return response.data;;
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
    return axios.post(`${API}/category/create`, JSON.stringify(category), {
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json',
            "id-token": `${idToken}`
        }
    })
    .then(response => {
        return response.data;
    })
    .catch(error => {
        console.log(error);
    })
};

export const createProduct = (idToken,  product) => {

    return axios.post(`${API}/product/create`, product, {
        headers: {
            Accept: 'application/json',
            "id-token": `${idToken}`
        }
    })
    .then(response => {
        return response.data;
    })
    .catch(error => {
        console.log(error);
    })
};

export const getUploadLink = (idToken, angle, fileName, fileType, name) => {
    const data = {
        angle: angle,
        fileName: fileName, 
        fileType: fileType,
        name: name
    }
    return axios.post(`${API}/s3/fetch-link`, data, {
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

export const uploadFile = (signedRequest, file, fileType) => {
    return axios.put(signedRequest, file, {
        headers: {
            'Content-Type': fileType
          }
    }).then(res => {
        console.log(res);
        return res.data;
    }).catch(err => console.log(err));
}