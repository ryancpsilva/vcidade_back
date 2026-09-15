import { getCity } from "../services/cityService.js"

export  async function listCities(req, res, next) {
  try {
    const { city } = req.query
    const cityGet = await getCity(city)

    res.json(cityGet)
  } catch (error) {
    next(error)
  }
}