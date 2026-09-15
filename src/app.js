import express from "express";
import cors from "cors";
import crimeRoutes from "./routes/crimeRoutes.js";
import cityRoutes from "./routes/cityRoutes.js"
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/", crimeRoutes);
app.use("/", cityRoutes);
app.use(errorHandler);

export default app;