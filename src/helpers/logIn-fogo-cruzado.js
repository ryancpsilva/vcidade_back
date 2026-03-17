import axios from "axios";
import { UnauthorizedError } from "../errors/UnauthorizedError.js";

export async function logIn(){
    try {        
        const response = await axios.post("https://api-service.fogocruzado.org.br/api/v2/auth/login", {
            email: process.env.EMAIL_FOGO_CRUZADO,
            password: process.env.PASSWORD_FOGO_CRUZADO
        })
        return response.data.data.accessToken
    } catch (error) {
        throw new UnauthorizedError(`Erro ao realizar login para o serviço Fogo Cruzado: ${error.message}`)
    }
}