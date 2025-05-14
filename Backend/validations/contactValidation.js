const { celebrate, Joi } = require('celebrate');
module.exports.insertContactUs= celebrate({
    body: Joi.object().keys({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        business_email: Joi.string().required(),
        phone: Joi.string().required(),
        message: Joi.string().required(),
        company: Joi.string().optional(),

    })
})