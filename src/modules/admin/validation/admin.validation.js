import Joi from "joi";

export const getUserByIdValidation = Joi.object({
    params: Joi.object({
        id: Joi.string()
            .pattern(/^[0-9a-fA-F]{24}$/)
            .required()
            .messages({ "string.pattern.base": "Invalid user ID format" }),
    }).required(),
});

export const updateUserRoleValidation = Joi.object({
    params: Joi.object({
        id: Joi.string()
            .pattern(/^[0-9a-fA-F]{24}$/)
            .required()
            .messages({ "string.pattern.base": "Invalid user ID format" }),
    }).required(),
    body: Joi.object({
        role: Joi.string()
            .valid("student", "instructor", "admin")
            .required(),
    }).required(),
});

export const deleteUserValidation = Joi.object({
    params: Joi.object({
        id: Joi.string()
            .pattern(/^[0-9a-fA-F]{24}$/)
            .required()
            .messages({ "string.pattern.base": "Invalid user ID format" }),
    }).required(),
});

export const getAllUsersValidation = Joi.object({
    query: Joi.object({
        page: Joi.number().integer().min(1).optional(),
        limit: Joi.number().integer().min(1).max(100).optional(),
        role: Joi.string().valid("student", "instructor", "admin").optional(),
    }).optional(),
});
