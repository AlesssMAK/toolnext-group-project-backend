import { Joi, Segments } from 'celebrate';
import moment from 'moment';
import mongoose from 'mongoose';

const objectIdValidator = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.message('toolId must be a valid ObjectId');
  }
  return value;
};

export const createBookingSchema = {
  [Segments.BODY]: Joi.object({
    toolId: Joi.string().required().custom(objectIdValidator),
    userFirstname: Joi.string().min(2).max(50).required(),
    userLastname: Joi.string().min(2).max(50).required(),
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
        const { startDate } = helpers.state.ancestors[0];
        const start = moment(startDate, 'YYYY-MM-DD');
        const end = moment(value, 'YYYY-MM-DD');
        if (!end.isValid()) return helpers.error('any.invalid');
        if (end.isBefore(start))
          return helpers.message('endDate must be after or equal to startDate');
        return value;
      }),

    deliveryCity: Joi.string().min(2).max(100).required(),
    deliveryBranch: Joi.string().min(1).max(200).required(),
  }),
};
