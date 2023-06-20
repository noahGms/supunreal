import Joi from "joi";

export const createAndUpdateMessageSchema = Joi.object({
  content: Joi.string().required(),
});