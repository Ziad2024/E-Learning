import Joi from "joi";

const objectId = Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .messages({ "string.pattern.base": "Invalid ID format" });

export const createCourseValidation = Joi.object({
    body: Joi.object({
        title: Joi.string().trim().min(3).max(200).required(),
        description: Joi.string().trim().min(10).required(),
        price: Joi.number().min(0).optional(),
        level: Joi.string()
            .valid("beginner", "intermediate", "advanced", "all_levels")
            .optional(),
        duration: Joi.number().min(0).optional(),
        status: Joi.string().valid("draft", "published", "archived").optional(),
    }).required(),
});

export const updateCourseValidation = Joi.object({
    params: Joi.object({
        id: objectId.required(),
    }).required(),
    body: Joi.object({
        title: Joi.string().trim().min(3).max(200).optional(),
        description: Joi.string().trim().min(10).optional(),
        price: Joi.number().min(0).optional(),
        level: Joi.string()
            .valid("beginner", "intermediate", "advanced", "all_levels")
            .optional(),
        duration: Joi.number().min(0).optional(),
        status: Joi.string().valid("draft", "published", "archived").optional(),
    })
        .min(1)
        .required(),
});

export const getCourseByIdValidation = Joi.object({
    params: Joi.object({
        id: objectId.required(),
    }).required(),
});

export const deleteCourseValidation = Joi.object({
    params: Joi.object({
        id: objectId.required(),
    }).required(),
});
