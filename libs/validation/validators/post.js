import Joi from "joi";

export const createPostSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  file: Joi.string().required(),
});

export const updatePostSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
});
