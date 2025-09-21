import joi from 'joi'
import { generalFields } from '../../middleware/validation.js'

export const addBrandVal = joi.object({
    name: generalFields.name.required()
})

export const updateBrandval = joi.object({
    name: generalFields.name,
    brnadId: generalFields.objectId.required()
})