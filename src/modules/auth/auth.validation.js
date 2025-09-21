import joi from 'joi'
import { generalFields } from '../../middleware/validation.js'

export const signupVal = joi.object({
    name: generalFields.name.required(),
    email: generalFields.email.required(),
    phone: generalFields.phone.required(),
    password: generalFields.password.required(),
    cPassword: generalFields.cPassword.required(),
    DOB: generalFields.DOB
})

export const loginVal = joi.object({
    phone: generalFields.phone.when('email', {
        is: joi.exist(), // email exist
        then: joi.optional(), // phone optional
        otherwise: joi.required() // phone required
    }),
    email: generalFields.email,
    password: generalFields.password.required()
})