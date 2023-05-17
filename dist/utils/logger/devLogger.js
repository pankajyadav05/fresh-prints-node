import { createLogger, format, transports } from "winston";
import myFormat from "./format.js";
const { combine, timestamp } = format;
const DevLogger = () => {
    return createLogger({
        level: "debug",
        format: combine(format.colorize(), timestamp({ format: "DD/MM/YYYY HH:mm:ss" }), myFormat),
        transports: [new transports.Console()],
    });
};
export default DevLogger;
//# sourceMappingURL=devLogger.js.map