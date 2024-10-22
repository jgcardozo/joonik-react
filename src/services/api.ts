import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';
const ENDPOINT_URL = `${API_BASE_URL}/locations`;
const API_KEY = process.env.REACT_APP_API_KEY;
// este lo puse aqui por si lo pierden 'rhGASH5alEghJ1i++9BGkDNVXhfOMCx3T5e5Q6E+VFE=';   en prod obviamente esto no se hace
//fue solo para el proposito de la prueba tecnica

export const fetchLocations = async () => {
    const response = await axios.get(ENDPOINT_URL, {
        headers: {
            API_KEY
        },
    });
    //console.log(response.data);
    return response.data.data;
};