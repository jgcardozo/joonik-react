import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';
const ENDPOINT_URL = API_BASE_URL+'/locations';
const API_KEY = 'rhGASH5alEghJ1i++9BGkDNVXhfOMCx3T5e5Q6E+VFE='; 

export const fetchLocations = async () => {
    const response = await axios.get(ENDPOINT_URL, {
        headers: {
            API_KEY
        },
    });
    console.log(response.data);
    return response.data.data;
};