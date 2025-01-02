const createError = require('http-errors');
const Joi = require('joi');
exports.validateRequest = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return next(createError(400, error.details[0].message));
  next();
};




function validateAvailabilityRequest(req, res, next) {
  const schema = Joi.object({
    checkInDate: Joi.date().required(),
    checkOutDate: Joi.date().required(),
    roomType: Joi.string().valid('deluxe', 'family', 'superDeluxe').optional(),
  });

  const { error } = schema.validate(req.query);
  if (error) return res.status(400).json({ error: error.details[0].message });

  next();
}

module.exports = validateAvailabilityRequest;
