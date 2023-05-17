import { check } from "express-validator";

export const StockPriceValidation = [
  check("stockQuality")
    .notEmpty()
    .withMessage("Stock Quality is mandatory")
    .isInt()
    .withMessage("Stock Quality should be a integer"),

  check("price")
    .notEmpty()
    .withMessage("Price is mandatory")
    .isFloat()
    .withMessage("Invalid value for field: price"),
];

export const BulkUpdateValidation = [
  check("apparel.*.stockQuality")
    .notEmpty()
    .withMessage("Stock Quality is mandatory")
    .isInt()
    .withMessage("Stock Quality should be a integer"),

  check("apparel.*.price")
    .notEmpty()
    .withMessage("Price is mandatory")
    .isFloat()
    .withMessage("Invalid value for field: price"),
];

export const OrderValidation = [
  check("stockQuality")
    .notEmpty()
    .withMessage("Stock Quality is mandatory")
    .isInt()
    .withMessage("Stock Quality should be a integer"),

  check("size")
    .notEmpty()
    .withMessage("Size is mandatory")
    .isIn(["S", "M", "L"])
    .withMessage("Invalid value for field: size"),
];
