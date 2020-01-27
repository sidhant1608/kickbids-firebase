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

export const firesignin = user => {
    return fetch(`${API}/signin`, {
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



export const fireauthenticate = (data, next) => {
    if(typeof(window) !== 'undefined'){
        localStorage.setItem('jwt',JSON.stringify(data));
        next();
    }
};

export const fireisAuthenticated = (next) => {
    if ( typeof window === 'undefined'){
        return false;
    }
    if ( localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem('jwt'));
    } else {
        return false;
    }
}