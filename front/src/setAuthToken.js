// setAuthToken.js
//setted in setAuthToken

import axios from 'axios';

const setAuthToken = token => {
    if(token) {
        axios.defaults.headers.common['Authorization'] = JSON.parse(token).id;
        console.log("authorization setted");
    }
    else {
        delete axios.defaults.headers.common['Authorization'];
        console.log("authorization removed");
    }
}

export default setAuthToken;
