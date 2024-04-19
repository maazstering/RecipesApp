import axios from 'axios';

const baseURL = 'http://localhost:5000'; // Adjust this URL to your backend's URL

export const createDeal = async (dishes) => {
    try {
        const response = await axios.post(`${baseURL}/deals`, { dishes });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getDeals = async () => {
    try {
        const response = await axios.get(`${baseURL}/deals`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
