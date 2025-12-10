import { Joi, Segments } from 'celebrate';
import moment from 'moment';
// import { ORDER_STATUS } from '../constants/orderStatuses.js';
// import { isValidObjectId } from 'mongoose';
// const objectIdValidator = (value, helpers) => {
//   return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
// };

export const createBookingSchema = {
  [Segments.BODY]: Joi.object({
    tools: Joi.array()
      .items(
        Joi.object({
          toolId: Joi.string().required(),
        }),
      )
      .min(1).required,
    userFirstname: Joi.string().required(),
    userLastname: Joi.string().required(),
    userPhone: Joi.string()
      .pattern(/^\+?[0-9\s\-()]{7,20}$/)
      .required()
      .messages({
        'string.pattern.base': 'userPhone must be a valid phone number',
        'any.required': 'userPhone is required',
      }),
    startDate: Joi.string()
      .pattern(/^\d{4}-\d{2}-\d{2}$/)
      .required()
      .custom((value, helpers) => {
        const today = moment().startOf('day');
        const date = moment(value, 'YYYY-MM-DD');
        if (!date.isValid()) return helpers.error('any.invalid');
        if (date.isBefore(today))
          return helpers.message('startDate must be today or later');
        return value;
      })
      .messages({
        'string.pattern.base': 'startDate must be in format YYYY-MM-DD',
        'any.required': 'startDate is required',
      }),
    endDate: Joi.string()
      .pattern(/^\d{4}-\d{2}-\d{2}$/)
      .required()
      .custom((value, helpers) => {
        const today = moment().startOf('day');
        const date = moment(value, 'YYYY-MM-DD');
        if (!date.isValid()) return helpers.error('any.invalid');
        if (date.isBefore(today))
          return helpers.message('startDate must be today or later');
        return value;
      })
      .messages({
        'string.pattern.base': 'startDate must be in format YYYY-MM-DD',
        'any.required': 'startDate is required',
      }),
    deliveryCity: Joi.string().required(),
    deliveryBranch: Joi.string().required(),
  }),
};
