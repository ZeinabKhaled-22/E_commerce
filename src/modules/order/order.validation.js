import joi from 'joi'
import { generalFields } from '../../middleware/validation'

export const creteOrderVal = joi.object({
    address: joi.string().required(),
    phone: generalFields.phone.required(),
    payment: joi.string().required(),
    coupon: generalFields.objectId.required()
})