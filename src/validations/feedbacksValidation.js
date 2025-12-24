import { Joi, Segments } from 'celebrate';

export const getFeedbacksValidation = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(1).max(30).default(10),
    sortBy: Joi.string().valid('rate', 'createdAt').default('createdAt'),
    sortOrder: Joi.string().valid('asc', 'desc').default('desc'),
    toolId: Joi.string(),
    userId: Joi.string(),
  }),
};

export const createFeedbackValidation={
  [Segments.BODY]:Joi.object({
    name:Joi.string().required(),
    toolId:Joi.string().hex().length(24).required(),
    description:Joi.string().min(3).max(1000).required(),
    rate:Joi.number().min(1).max(5).precision(1).required(),
  }),
};
// .unknown(true)
