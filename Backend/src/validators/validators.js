// this is validators.js file
import Joi from "joi";

export const userRegistrationSchema = Joi.object({
  fullName: Joi.string().min(3).max(30).required().messages({
    "string.base": "Full name must be a string.",
    "string.empty": "Full name is required.",
    "string.min": "Full name must be at least 3 characters.",
    "string.max": "Full name must be at most 30 characters.",
    "any.required": "Full name is required.",
  }),
  userName: Joi.string().min(3).max(30).required().messages({
    "string.base": "Username must be a string.",
    "string.empty": "Username is required.",
    "string.min": "Username must be at least 3 characters.",
    "string.max": "Username must be at most 30 characters.",
    "any.required": "Username is required.",
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } }) // disables strict TLD checking
    .required()
    .messages({
      "string.base": "Email must be a string.",
      "string.email": "Email must be a valid email address.",
      "string.empty": "Email is required.",
      "any.required": "Email is required.",
    }),

  password: Joi.string()
    .min(6)
    .max(30)
    .pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])/)
    .required()
    .messages({
      "string.base": "Password must be a string.",
      "string.empty": "Password is required.",
      "string.min": "Password must be at least 6 characters.",
      "string.max": "Password must be at most 30 characters.",
      "string.pattern.base":
        "Password must contain at least one number and one special character.",
      "any.required": "Password is required.",
    }),
  role: Joi.string().valid("buyer", "seller", "admin").required().messages({
    "any.only": "Role must be one of buyer, seller, or admin.",
    "string.empty": "Role is required.",
    "any.required": "Role is required.",
  }),
});

export const userLoginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "Email must be a string.",
    "string.email": "Email must be a valid email address.",
    "string.empty": "Email is required.",
    "any.required": "Email is required.",
  }),
  password: Joi.string().min(6).max(30).required().messages({
    "string.base": "Password must be a string.",
    "string.empty": "Password is required.",
    "string.min": "Password must be at least 6 characters.",
    "string.max": "Password must be at most 30 characters.",
    "any.required": "Password is required.",
  }),
});

export const validateUserRegistration = (req, res, next) => {
  const { error } = userRegistrationSchema.validate(req.body, {
    abortEarly: false,
    allowUnknown: true,
  });

  if (error) {
    const errors = error.details.map((err) => err.message);
    return res.status(400).json({ message: "Validation error", errors });
  }
  console.log("User registration validation completed");
  next();
};

export const validateUserLogin = (data) => {
  console.log("User login validation completed");
  return validateSchema(userLoginSchema, data);
};
