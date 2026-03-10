import {getCity} from "../services/cityService.js"

export const listCities = async (req, res) => {
  try {
    const {city} = req.query
    const cityGet = await getCity(city)

    res.json(cityGet)
  } catch (error) {
    res.status(500).json({
      error: error.message
    });

  }
}