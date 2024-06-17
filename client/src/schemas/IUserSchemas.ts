import Joi from "joi";

// for IUserSignup interface
export const shcemaIUserSignup = Joi.object({
  name: Joi.object({
    first: Joi.string().required().min(2).max(256),
    last: Joi.string().required().min(2).max(256),
  }),
  phone: Joi.string().required().min(9).max(11),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string()
    .min(9)
    .message("Password must be at least 9 characters long.")
    .concat(
      Joi.string()
        .pattern(new RegExp("(?=.*[a-z])"))
        .message("Password must include at least one lowercase letter.")
    )
    .concat(
      Joi.string()
        .pattern(new RegExp("(?=.*[A-Z])"))
        .message("Password must include at least one uppercase letter.")
    )
    .concat(
      Joi.string()
        .pattern(new RegExp("(?=.*[0-9])"))
        .message("Password must include at least one number.")
    )
    .concat(
      Joi.string()
        .pattern(new RegExp("(?=.*[!@#$%^&*-])"))
        .message(
          "Password must include at least one special character (!@#$%^&*-)."
        )
    ),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "any.required": '"Password Verification" is not allowed to be empty',
    "any.only": "Passwords do not match",
  }),
  image: Joi.object({
    url: Joi.string().uri().required().min(14),
    alt: Joi.string().required(),
  }),
  address: Joi.object({
    country: Joi.string().required().min(2).max(256),
    city: Joi.string().required().min(2).max(256),
    street: Joi.string().required().min(2).max(256),
    houseNumber: Joi.number().required().min(1).max(9999),
    zip: Joi.number().required().min(10000).max(9999999),
  }),
  isBusiness: Joi.boolean(),
});
