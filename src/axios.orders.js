import axios from 'axios';

const orderInstance = axios.create({
    baseURL: 'https://burger-builder-fc8a7.firebaseio.com/'
});

// orderInstance.defaults.;

export default orderInstance;
