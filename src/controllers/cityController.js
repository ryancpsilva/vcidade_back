import { getCity } from "../services/cityService.js"

export  async function listCities(req, res) {
  try {
    const { city } = req.query
    const cityGet = await getCity(city)

    res.json(cityGet)
  } catch (error) {
    res.status(error.statusCode || 500).json({
      error: error.message
    });
  }
}