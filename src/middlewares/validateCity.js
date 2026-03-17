import { ValidationError } from "../errors/ValidationError";

export function validateCity(req, res, next) {

    const { city } = req.query;

    if (!city) {
        return next();
    }

    if (city.match(/\d/)) {
        throw new ValidationError("A requisição não pode conter números")
    }

    const cityFormatted = city.trim();

    if (cityFormatted.length < 2) {
        throw new ValidationError("City deve ter pelo menos 2 caracteres")        
    }

    req.query.city = cityFormatted;

    next();
};