import express from "express";
import { listCities } from "../controllers/cityController.js";
import { validateCity } from "../middlewares/validateCity.js";

const router = express.Router();

router.get("/cities", validateCity, listCities);

export default router;