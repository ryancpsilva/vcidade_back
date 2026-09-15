import { ValidationError } from "../errors/ValidationError.js";

export function validateNeighborhood(req, res, next) {

    const { neighborhood } = req.query;

    if (!neighborhood) {
        return next();
    }

    const neighborhoodFormatted = neighborhood.trim();

    if (/\d/.test(neighborhoodFormatted)) {
        throw new ValidationError("Neighborhood não pode conter números")
    }

    if (neighborhoodFormatted.length < 2) {
        throw new ValidationError("Neighborhood dever ter pelo menos 2 caracteres")
    }

    if (!/^[a-zA-Z\s]+$/.test(neighborhoodFormatted)) {
        throw new ValidationError("Neighborhood deve conter apenas letras")
    }

    req.query.neighborhood = neighborhoodFormatted;

    next();
}
