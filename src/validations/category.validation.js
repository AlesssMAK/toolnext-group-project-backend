const Joi = require("joi");

exports.createCategorySchema = Joi.object({
  name: Joi.string().min(2).max(40).required()
});
