export function validateNeighborhood(req, res, next) {

    const { neighborhood } = req.query;

    if (!neighborhood) {
        return next();
    }

    const neighborhoodFormatted = neighborhood.trim();

    if (/\d/.test(neighborhoodFormatted)) {
        return res.status(400).json({
            error: "Neighborhood não pode conter números"
        });
    }

    if (neighborhoodFormatted.length < 2) {
        return res.status(400).json({
            error: "Neighborhood deve ter pelo menos 2 caracteres"
        });
    }

    if (!/^[a-zA-Z\s]+$/.test(neighborhoodFormatted)) {
        return res.status(400).json({
            error: "Neighborhood deve conter apenas letras"
        });
    }

    req.query.neighborhood = neighborhoodFormatted;

    next();
}
