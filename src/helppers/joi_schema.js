import joi from 'joi'

export const email = joi.string().pattern(new RegExp('gmail.com$')).required()
export const password = joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required()
export const title = joi.string().required()
export const price = joi.number().required()
export const category_code = joi.string().uppercase().alphanum().required()
export const image = joi.string().required()
export const book_id = joi.string().required()
export const book_ids = joi.array().required()
export const name = joi.string()