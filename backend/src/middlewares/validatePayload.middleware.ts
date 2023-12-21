import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, z } from 'zod';

interface Errors {
  fieldErrors?: {
    [x: string]: string[] | undefined;
  };
  formErrors?: {
    invalidFields?: string[];
  };
}

export const validatePayload =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);

      return next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;

        let errors: Errors = {};

        if (Object.keys(fieldErrors).length) {
          errors = {
            ...errors,
            fieldErrors,
          };
        }

        const unrecognizedError = error.issues.find(
          (item) => item.code === 'unrecognized_keys'
        ) as z.ZodIssue & { keys: string[] };

        if (unrecognizedError) {
          const unrecognizedKeys = unrecognizedError.keys;

          errors = {
            formErrors: {
              invalidFields: unrecognizedKeys,
            },
            ...errors,
          };
        }

        return res.status(400).json(errors);
      }
    }
  };
