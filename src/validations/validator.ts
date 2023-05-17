import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

const Validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  return res.status(422).json(errors);
};

export default Validate;
