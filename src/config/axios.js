import axios from "axios";
import { logIn } from "../helpers/logIn-fogo-cruzado.js";


const api = axios.create({
  baseURL: "https://api-service.fogocruzado.org.br/api/v2",
  headers: {
    Authorization: `Bearer ${await logIn()}`
  }
});

export default api;