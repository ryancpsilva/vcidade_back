import express from "express";
import cors from "cors";
import crimeRoutes from "./routes/crimeRoutes.js";
import cityRoutes from "./routes/cityRoutes.js"

const app = express();

app.use(cors());
app.use(express.json());
app.use("/", crimeRoutes);
app.use("/", cityRoutes);

export default app;