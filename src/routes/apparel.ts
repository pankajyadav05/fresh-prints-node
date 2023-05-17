import { Request, Response, Express } from "express";
import tryCatch from "../utils/tryCatch.js";
import ApparelService from "../services/apparel.service.js";
import Validate from "../validations/validator.js";
import {
  BulkUpdateValidation,
  OrderValidation,
  StockPriceValidation,
} from "../validations/apparel.validations.js";
import {
  ApparelUpdate,
  Stock,
  UserOrder,
} from "../interfaces/apparel.interface.js";

const ApparelRouter = (app: Express) => {
  const service = new ApparelService();

  // Route to update the stock quality and price of one apparel code and size
  app.put(
    "/apparel/:code/size/:size",
    StockPriceValidation,
    Validate,
    tryCatch(async (req: Request, res: Response) => {
      const { code, size } = req.params;
      const { stockQuality, price }: ApparelUpdate = req.body;

      // Update the stock quality and price for the given code and size
      await service.updateSingleApparelBySize({
        code,
        size,
        stockQuality,
        price,
      });

      return res.status(200).json({ message: "Stock updated successfully" });
    })
  );

  // Route to update the stock quality and price of several apparel codes and sizes
  app.put(
    "/apparel/bulk",
    BulkUpdateValidation,
    Validate,
    tryCatch(async (req: Request, res: Response) => {
      const updates: { stocks: Stock[] } = req.body;

      // Update the stock quality and price for multiple codes and sizes
      await service.bulkUpdateApparelBySize(updates.stocks);

      return res
        .status(200)
        .json({ message: "Bulk stock updated successfully" });
    })
  );

  // Route to check if a customer order can be fulfilled
  app.post(
    "/order/fulfillment",
    OrderValidation,
    Validate,
    tryCatch(async (req: Request, res: Response) => {
      const order: UserOrder = req.body;

      // Check if the order can be fulfilled
      const { isStock } = await service.checkIfStockExists(order);

      return res.status(200).json({
        canFulfill: isStock
          ? "Yes, Stock is available"
          : "Stock is not available",
      });
    })
  );

  // Route to get the lowest cost to fulfill a customer order
  app.post(
    "/order/lowest-cost",
    OrderValidation,
    Validate,
    tryCatch(async (req: Request, res: Response) => {
      const order: UserOrder = req.body;

      // Calculate the lowest cost to fulfill the order
      const lowestCost = await service.getLowestCost(order);

      res.status(200).json({ lowestCost });
    })
  );
};

export default ApparelRouter;
