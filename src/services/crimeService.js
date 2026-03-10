import api from "../config/axios.js";
import { getCity } from "./cityService.js";

export async function getCrimesByCity(city) {
  try {
    const dataFim = new Date().toISOString().split("T")[0];
    const dataTransform = new Date()
    dataTransform.setFullYear(dataTransform.getFullYear() - 1)
    const dataInicio = dataTransform.toISOString().split("T")[0];
    const cityId = await getCity(city)
     
    const response = await api.get(`/occurrences
?initialdate=${dataInicio}
&finaldate=${dataFim}
&idState=b112ffbe-17b3-4ad0-8f2a-2038745d1d14
&idCities=${cityId.data[0].id}
&page=1
&take=999999`);
    
    return response.data.data;
    
  } catch (error) {
    console.log(error.response?.data || error.message);
    throw new Error("Erro ao buscar crimes");

  }
}

export async function getNeighborhoodCrimes(city, neighborhood) {
  const crimesArray = await getCrimesByCity(city)
  const neighborhoodCrimes = []
  crimesArray.forEach(crime => {
    if (crime.neighborhood.name === neighborhood) {
      neighborhoodCrimes.push(crime)
    }
  });
  return neighborhoodCrimes
}