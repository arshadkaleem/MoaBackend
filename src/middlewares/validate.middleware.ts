import Joi from 'joi';
import _ from 'lodash';
import { Request, Response, NextFunction } from 'express';

interface ValidationSchema {
  params?: Joi.ObjectSchema;
  query?: Joi.ObjectSchema;
  body?: Joi.ObjectSchema;
}

const validate = (schema: ValidationSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Pick only the properties we want to validate (params, query, body)
    const validSchema = _.pick(schema, ['params', 'query', 'body']);

    // Pick the corresponding properties from the request
    const object = _.pick(req, Object.keys(validSchema));

    // Compile and validate
    const { error, value } = Joi.compile(validSchema)
      .prefs({
        errors: {
          label: 'path',
          wrap: { label: false }
        },
        abortEarly: false
      })
      .validate(object);

    if (error) {
      return next(error);
    }

    // Update req with validated values
    Object.assign(req, value);
    return next();
  };
};
