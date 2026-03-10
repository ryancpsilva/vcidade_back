import express from "express";
import { listCrimes } from "../controllers/crimeController.js";

const router = express.Router();

router.get("/crimes", listCrimes);

export default router;