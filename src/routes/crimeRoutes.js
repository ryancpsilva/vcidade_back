import express from "express";
import { listCrimes } from "../controllers/crimeController.js";
import { validateCity } from "../middlewares/validateCity.js";

const router = express.Router();

router.get("/crimes", validateCity, listCrimes);

export default router;