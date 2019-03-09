// setAuthToken.js
//setted in setAuthToken

import axios from 'axios';

const setAuthToken = token => {
    if(token) {
        axios.defaults.headers.common['Authorization'] = JSON.parse(token).id;
    }
    else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

export default setAuthToken;
