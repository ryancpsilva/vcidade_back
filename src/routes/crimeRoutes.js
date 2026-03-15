import express from "express";
import { listCrimes } from "../controllers/crimeController.js";
import { validateCity } from "../middlewares/validateCity.js";
import { validateNeighborhood } from "../middlewares/validateNeighborhood.js";

const router = express.Router();

router.get("/crimes", validateCity, validateNeighborhood, listCrimes);

export default router;