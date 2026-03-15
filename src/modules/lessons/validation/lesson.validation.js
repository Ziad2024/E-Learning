import Joi from "joi";

const objectId = Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .messages({ "string.pattern.base": "Invalid ID format" });

export const createLessonValidation = Joi.object({
    body: Joi.object({
        title: Joi.string().trim().min(3).max(200).required(),
        course: objectId.required(),
        description: Joi.string().trim().optional(),
        content: Joi.string().optional(),
        type: Joi.string()
            .valid("video", "text", "quiz", "assignment")
            .optional(),
        duration: Joi.number().min(0).optional(),
        order: Joi.number().integer().min(0).optional(),
        isPublished: Joi.boolean().optional(),
    }).required(),
});

export const updateLessonValidation = Joi.object({
    params: Joi.object({
        id: objectId.required(),
    }).required(),
    body: Joi.object({
        title: Joi.string().trim().min(3).max(200).optional(),
        description: Joi.string().trim().optional(),
        content: Joi.string().optional(),
        type: Joi.string()
            .valid("video", "text", "quiz", "assignment")
            .optional(),
        duration: Joi.number().min(0).optional(),
        order: Joi.number().integer().min(0).optional(),
        isPublished: Joi.boolean().optional(),
    })
        .min(1)
        .required(),
});

export const getLessonByIdValidation = Joi.object({
    params: Joi.object({
        id: objectId.required(),
    }).required(),
});

export const deleteLessonValidation = Joi.object({
    params: Joi.object({
        id: objectId.required(),
    }).required(),
});
