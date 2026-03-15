import Joi from "joi"

export const  registerValidation  = Joi.object({
    body : Joi.object( {
        firstName : Joi.string().trim().required() ,
        lastName :Joi.string().trim().required() ,
        email : Joi.string().email().required() ,
        role : Joi.string().valid( "student" , "instructor" , "admin").optional() ,
        password : Joi.string()
        .min(8)
        .required() ,
        // .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/) 

    } ).required()
})



export const  loginValidation  = Joi.object({
    body : Joi.object( {
        email : Joi.string().email().required() ,
        password : Joi.string()
        .min(8)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/) 
        .required() ,

    } ).required()
})


