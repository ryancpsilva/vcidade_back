import { getCrimesByCity, getNeighborhoodCrimes } from "../services/crimeService.js";

export async function listCrimes(req, res) {
  try {
    const {city, neighborhood} = req.query
    if (neighborhood) {
      const crimes = await getNeighborhoodCrimes(city, neighborhood);
      res.json(crimes);
    } else {
      const crimes = await getCrimesByCity(city);
      res.json(crimes);
    }

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
}