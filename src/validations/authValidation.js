
import { Joi, Segments } from 'celebrate';

export const registerUserSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string(). min(2). max(32). required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
      "any.only": "Паролі не співпадають",
    }),
  }),
};

export const loginUserSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email(),
    // name: Joi.string().min(2).max(32),
    password: Joi.string().min(8).required(),
  })
  // .xor("email", "name")
  // .messages({
  //   "object.missing": "Потрібно вказати email або name",
  // }),
};
