import { Request, Response, NextFunction } from "express";
import { ZodTypeAny } from "zod";

export const validateDataMiddleware =
  (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    const validatedData = schema.parse(req.body);
    console.log(schema,req.body)
    req.body = validatedData;

    return next();
  };