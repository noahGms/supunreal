import Joi from "joi";

export const createAndUpdateCommentSchema = Joi.object({
  content: Joi.string().required(),
});