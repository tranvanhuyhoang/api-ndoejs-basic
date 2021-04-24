import Joi from '@hapi/joi';

// Register Validate
export function registerValidation(data){
    const schema = Joi.object ({
        name: Joi.string()
                 .min(4)
                 .required(),
        email: Joi.string()
                   .email()
                   .min(6)
                   .required(),
        password: Joi.string()
                   .min(6)
                   .required(),
                          
    })
   return  schema.validate(data)
}

// Login Validate
export function loginValidation(data){
  const schema = Joi.object ({
      email: Joi.string()
                 .email()
                 .min(6)
                 .required(),
      password: Joi.string()
                 .min(6)
                 .required(),
  })
 return  schema.validate(data)
}

