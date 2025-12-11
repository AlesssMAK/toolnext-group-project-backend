import { Joi, Segments } from 'celebrate';

export const getFeedbacksValidation = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(1).max(30).default(10),
    sortBy: Joi.string().valid('rate', 'createdAt').default('createdAt'),
    sortOrder: Joi.string().valid('asc', 'desc').default('desc'),
  })
};
