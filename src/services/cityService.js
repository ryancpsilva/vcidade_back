import api from "../config/axios.js";
import NotFoundError from "../errors/NotFoundError.js";

export const getCity = async (city) => {

    const url = city
        ? `/cities?cityName=${city}`
        : `/cities`;
    const response = await api.get(url);

    if (!response || response.data.data.length === 0) {
        throw new NotFoundError("Cidade não encontrada");
    }

    return response.data;
};