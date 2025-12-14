import Joi from "joi";

export const createCategorySchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).required(),
  keywords: Joi.string().allow("").optional(),
});
