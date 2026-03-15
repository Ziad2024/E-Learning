import Joi from "joi";

const objectId = Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .messages({ "string.pattern.base": "Invalid ID format" });

export const createEnrollmentValidation = Joi.object({
    body: Joi.object({
        course: objectId.required(),
    }).required(),
});

export const deleteEnrollmentValidation = Joi.object({
    params: Joi.object({
        id: objectId.required(),
    }).required(),
});
