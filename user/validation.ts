import joi from 'joi';

export const userValidation = {
    validateSchema(body) {
        const schema = joi.object().keys({
            email: joi.string().email().required(),
            password: joi.string().required(),
            role: joi.string().required()
        });
        const { error, value } = schema.validate(body);
        if (error && error.details) {
            return { error };

        }
        return { value };

    },
    loginValidation(body) {
        const schema = joi.object().keys({
            email: joi.string().email().required(),
            password: joi.string().required(),

        });
        const { error, value } = schema.validate(body);
        if (error && error.details) {
            return { error };

        }
        return { value };

    },
    forgotPasswordValidation(body) {
        const schema = joi.object().keys({
            emailId: joi.string().email().required(),

        });
        const { error, value } = schema.validate(body);
        if (error && error.details) {
            return { error };

        }
        return { value };

    }
}
