import express from "express";
import cors from "cors";
import ErrorHandler from "./middlewares/errorHandler.js";
import ApparelRouter from "./routes/apparel.js";
const ExpressApp = async (app) => {
    app.use(express.json());
    app.use(cors());
    ApparelRouter(app);
    app.use(ErrorHandler);
};
export default ExpressApp;
//# sourceMappingURL=express-app.js.map