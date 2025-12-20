import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

const objectIdValidator = (value, helpers) => {
    return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const createToolSchema = {
    [Segments.BODY]:Joi.object({
        name: Joi.string().min(3).max(96).required(),
        pricePerDay: Joi.number().min(0).required(),
        category: Joi.string().custom(objectIdValidator).required(),
        description: Joi.string().min(20).max(2000).required(),
        rentalTerms: Joi.string().min(20).max(1000).required(),
        specifications: Joi.string().max(1000).optional().allow(''),
    }),
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
        category: Joi.string().custom(objectIdValidator),
        description: Joi.string().min(20).max(2000),
        rentalTerms: Joi.string().min(20).max(1000),
        specifications: Joi.string().max(1000).optional().allow(''),
    }).min(1),
};

export const getToolsSchema = {
    [Segments.QUERY]: Joi.object({
        page: Joi.number().integer().min(1).default(1),
        limit: Joi.number().integer().min(5).max(20).default(10),
        categories: Joi.string().trim().allow(''),
        search: Joi.string().trim().allow(''),
        minPrice: Joi.number().min(0),
        maxPrice: Joi.number().min(0)
    })
};