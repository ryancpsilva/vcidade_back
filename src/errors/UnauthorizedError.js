import { AppError } from "./AppError.js";

export class UnauthorizedError extends AppError {
    constructor(message = "Acesso não autorizado") {
        super(message, 401)
    }
}