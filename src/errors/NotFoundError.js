import { AppError } from "./AppError.js"

export default class NotFoundError extends AppError {
    constructor(message = "Recurso não encontrado") {
        super(message, 404)
    }
}