// userSchemas.js

const Joi = require('joi');

// password rules: at least one upper case letter, at least one lower case letter, at least one number, at least one special characted, at least 7 characters total
const passwordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{7,}$/;
const phonePattern = /^05\d{1}([-]{0,1})\d{7}$/;

const validationOptions = {
  stripUnknown: true,
  abortEarly: false,
};


const userSchema = Joi.object().keys({
  name: Joi.object().keys({
    first: Joi.string().required(),
    middle: Joi.string().optional().default(""),
    last: Joi.string().required(),
  }),
  phone: Joi.string().pattern(phonePattern, { name: 'cellphone number' }).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(passwordPattern, { name: 'password' }).required(),
  image: Joi.object().keys({
    url: Joi.string().uri().required(),
    alt: Joi.string().optional().default("Profile image"),
  }),
  address: Joi.object().keys({
    state: Joi.string().optional().allow(""),
    country: Joi.string().required(),
    city: Joi.string().required(),
    street: Joi.string().required(),
    houseNumber: Joi.number().required(),
    zip: Joi.string().required(),
  }),
  isBusiness: Joi.boolean().required(),
}).options(validationOptions);

const updateUserSchema = Joi.object().keys({
  name: Joi.object().keys({
    first: Joi.string().optional(),
    middle: Joi.string().optional().default(""),
    last: Joi.string().optional(),
  }),
  phone: Joi.string().pattern(phonePattern, { name: 'cellphone number' }).optional(),
  password: Joi.string().pattern(passwordPattern, { name: 'password' }).optional(),
  image: Joi.object().keys({
    url: Joi.string().uri().optional(),
    alt: Joi.string().optional().default("Profile image"),
  }),
  address: Joi.object().keys({
    state: Joi.string().optional().allow(""),
    country: Joi.string().optional(),
    city: Joi.string().optional(),
    street: Joi.string().optional(),
    houseNumber: Joi.number().optional(),
    zip: Joi.string().optional(),
  }),
}).options(validationOptions).min(1).messages({
  'object.min': "The request's body must include at least one valid key"
});

const updateUserBusinessStatusSchema = Joi.object({
  isBusiness: Joi.boolean().required()
}).options(validationOptions);


const loginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(passwordPattern, { name: 'password' }).required(),
}).options(validationOptions);


const schemas = {
  createNewUser: userSchema,
  updateUser: updateUserSchema,
  updateUserBusinessStatus: updateUserBusinessStatusSchema,
  login: loginSchema,
};

module.exports = schemas;
