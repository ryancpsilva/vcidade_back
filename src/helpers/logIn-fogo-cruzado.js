import axios from "axios";

export const logIn = async () => {
    try {
        
        const response = await axios.post("https://api-service.fogocruzado.org.br/api/v2/auth/login", {
            email: process.env.EMAIL_FOGO_CRUZADO,
            password: process.env.PASSWORD_FOGO_CRUZADO
        })
        return response.data.data.accessToken
    } catch (error) {
        throw Error(`Erro ao realizar login para o serviço Fogo Cruzado: ${error.message}`)
    }
}