import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

export const createToolSchema = {
    [Segments.BODY]:Joi.object({
        name: Joi.string().min(3).max(96).required(),
        pricePerDay: Joi.number().min(0).required(),
        categoryId: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
        description: Joi.string().min(20).max(2000).required(),
        terms: Joi.string().min(20).max(1000).required(),
        specifications: Joi.string().max(1000),
        images: Joi.object({
            mimetype: Joi.string().valid('image/jpeg', 'image/png').required(),
            size: Joi.number().max(1048576)
        }).required()
    })
};

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};
export const toolIdParamSchema = {
  [Segments.PARAMS]: Joi.object({
    toolId: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const updateToolSchema = {
    [Segments.PARAMS]: Joi.object({
        toolId: Joi.string().custom(objectIdValidator).required(),
    }),
    [Segments.BODY]: Joi.object({
        name: Joi.string().min(3).max(96),
        pricePerDay: Joi.number().min(0),
        categoryId: Joi.alternatives().try(Joi.string(), Joi.number()),
        description: Joi.string().min(20).max(2000),
        terms: Joi.string().min(20).max(1000),
        specifications: Joi.string().max(1000),
        images: Joi.object({
            mimetype: Joi.string().valid('image/jpeg', 'image/png'),
            size: Joi.number().max(1048576)
        })
    }).min(1)
};

export const getToolsSchema = {
    [Segments.QUERY]: Joi.object({
        page: Joi.number().integer().min(1).default(1),
        limit: Joi.number().integer().min(5).max(20).default(10),
        categoryId: Joi.alternatives([Joi.string(), Joi.number()]).required(),
        search: Joi.string().trim().allow('')
    })
};