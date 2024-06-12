import * as Joi from 'joi';
export const envSchema = Joi.object({
    PORT: Joi.number().port().required(),
    DATABASE_URL: Joi.string().uri().required(),
}).unknown(true);