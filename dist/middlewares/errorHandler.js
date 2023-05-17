import { AppError, logger } from "../utils/index.js";
const ErrorHandler = (error, req, res, next) => {
    if (error instanceof AppError) {
        ErrorLogger(error.message, req, error.errorCode);
        return res.status(error.statusCode).json({
            errorCode: error.errorCode,
            message: error.message,
        });
    }
    ErrorLogger(`${error}`, req, 500);
    return res.status(500).json({ message: `${error}` });
};
async function ErrorLogger(message, req, errorCode) {
    logger.error(message, {
        errorCode,
        body: req.body,
    });
}
export default ErrorHandler;
//# sourceMappingURL=errorHandler.js.map