// cardSchemas.js

const Joi = require('joi');


const phonePattern = /^05\d{1}([-]{0,1})\d{7}$/;

const validationOptions = {
  stripUnknown: true,
  abortEarly: false,
};


const cardSchema = Joi.object().keys({
  title: Joi.string().required(),
  subtitle: Joi.string().required(),
  description: Joi.string().optional(),
  phone: Joi.string().pattern(phonePattern, { name: 'cellphone number' }).required(),
  email: Joi.string().email().required(),
  web: Joi.string().uri().required(),
  image: Joi.object().keys({
    url: Joi.string().required(),
    alt: Joi.string().optional().default(''),
  }),
  address: Joi.object().keys({
    state: Joi.string().required(),
    country: Joi.string().required(),
    city: Joi.string().required(),
    street: Joi.string().required(),
    houseNumber: Joi.number().required(),
    zip: Joi.string().required(),
  }),
}).options(validationOptions);

const updateCardSchema = Joi.object().keys({
  title: Joi.string().optional(),
  subtitle: Joi.string().optional(),
  description: Joi.string().optional(),
  phone: Joi.string().pattern(phonePattern, { name: 'cellphone number' }).optional(),
  email: Joi.string().email().optional(),
  web: Joi.string().uri().optional(),
  image: Joi.object().keys({
    url: Joi.string().optional(),
    alt: Joi.string().optional().default(''),
  }),
  address: Joi.object().keys({
    state: Joi.string().optional(),
    country: Joi.string().optional(),
    city: Joi.string().optional(),
    street: Joi.string().optional(),
    houseNumber: Joi.number().optional(),
    zip: Joi.string().optional(),
  }),
}).options(validationOptions).min(1).messages({
  'object.min': "The request's body must include at least one valid key",
});

const searchCardSchema = Joi.object().keys({
  searchTerm: Joi.string().min(3).max(30).required(),
  searchFields: Joi.array().items(
    Joi.string().valid('title', 'subtitle', 'description')
  ).min(1).required(),
}).options(validationOptions);


const schemas = {
  createNewCard: cardSchema,
  updateCard: updateCardSchema,
  searchCard: searchCardSchema,
};


module.exports = schemas;
