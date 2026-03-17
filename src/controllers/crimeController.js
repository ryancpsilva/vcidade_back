import { getCrimesByCity, getNeighborhoodCrimes } from "../services/crimeService.js";

export async function listCrimes(req, res, next) {
  try {
    const { city, neighborhood } = req.query
    if (neighborhood) {
      const crimes = await getNeighborhoodCrimes(city, neighborhood);
      res.json(crimes);
    } else {
      const crimes = await getCrimesByCity(city);
      res.json(crimes);
    }

  } catch (error) {
    next(error)
  }
}