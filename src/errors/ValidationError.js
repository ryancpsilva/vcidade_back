import { AppError } from "./AppError.js";

export class ValidationError extends AppError {
    constructor(message = "Erro de validação") {
        super(message, 400);
    }
}