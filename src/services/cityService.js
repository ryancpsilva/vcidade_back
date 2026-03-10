import api from "../config/axios.js";

export const getCity = async (city) => {
    try {
        if (city) {
            const response = await api.get(`/cities?cityName=${city}`);
            return response.data;
        } else {
            const response = await api.get(`/cities`);
            return response.data;
        }
    } catch (error) {
        console.log(error.response?.data || error.message);
        throw new Error("Erro ao buscar crimes");
    }
}