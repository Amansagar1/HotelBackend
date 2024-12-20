const createError = require('http-errors');

exports.validateRequest = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return next(createError(400, error.details[0].message));
  next();
};
