export const validateCity = (req, res, next) => {

    const { city } = req.query;

    if (!city) {
        return next();
    }

    if (city.match(/\d/)) {
        return res.status(400).json({
            error: "A requisição não pode conter números"
        });
    }

    const cityFormatted = city.trim();

    if (cityFormatted.length < 2) {
        return res.status(400).json({
            error: "City deve ter pelo menos 2 caracteres"
        });
    }

    req.query.city = cityFormatted;

    next();
};