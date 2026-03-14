import api from "../config/axios.js";
import NotFoundError from "../errors/NotFoundError.js";
import { ValidationError } from "../errors/ValidationError.js";
import { getCity } from "./cityService.js";

export async function getCrimesByCity(city) {

  // Crime necessita de city para funcionar
  if (!city) {
    throw new ValidationError("Cidade é obrigatória.");
  }

  try {
    // Validação de data para o intervalo de 1 ano até o dia atual
    const dataFim = new Date().toISOString().split("T")[0];
    const dataTransform = new Date()
    dataTransform.setFullYear(dataTransform.getFullYear() - 1)
    const dataInicio = dataTransform.toISOString().split("T")[0];
    const cityResponse = await getCity(city)
    
    console.log(cityResponse.data[0].id)

    if (!cityResponse?.data || cityResponse.data.length === 0) {
      throw new NotFoundError("Cidade não encontrada.");
    }

    const cityId = cityResponse.data[0].id;

    const response = await api.get("/occurrences", {
      params: {
        initialdate: dataInicio,
        finaldate: dataFim,
        idState: "b112ffbe-17b3-4ad0-8f2a-2038745d1d14",
        idCities: cityId,
        page: 1,
        take: 999999
      }
    });

    // Elimina casos em que a resposta não bate com o que foi pedido pela requisição
    if (response.data.data[0].city.name.toLowerCase() !== city.toLowerCase()) {
      throw new ValidationError("Cidade inválida, verifique sua requisição")
    }

    return response.data.data;

  } catch (error) {
    throw error
  }
}

export async function getNeighborhoodCrimes(city, neighborhood) {

  //Caso a requisição seja feita com bairro, bairro e cidade se tornam obrigatórios
  if (!city || !neighborhood) {
    throw new ValidationError("Cidade e bairro são obrigatórios");
  }

  const crimesArray = await getCrimesByCity(city);
  //Aplico um segundo array para abranger uma segunda filtragem mais abrangente?
  return crimesArray.filter(crime =>
    crime.neighborhood?.name === neighborhood
  );
}