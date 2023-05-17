import { APPAREL_NOT_FOUND, STOCK_NOT_AVAILABLE, } from "../constants/errorCodes.js";
import ApparelRepository from "../repository/apparel.repo.js";
import AppError from "../utils/appError.js";
class ApparelService {
    constructor() {
        this.repo = new ApparelRepository();
    }
    async updateSingleApparelBySize(stock) {
        const foundApparel = await this.repo.findOneApparelByCode(stock.code);
        if (!foundApparel)
            throw new AppError(APPAREL_NOT_FOUND, "No Apparel found with provided code", 404);
        await this.repo.updateOneApparel(stock);
    }
    async bulkUpdateApparelBySize(stocks) {
        for (let stock of stocks) {
            const foundApparel = await this.repo.findOneApparelByCode(stock.code);
            if (!foundApparel)
                throw new AppError(APPAREL_NOT_FOUND, `No Apparel found with code ${stock.code}`, 404);
            await this.repo.updateOneApparel(stock);
        }
    }
    async checkIfStockExists({ stockQuality, size, code }) {
        const foundApparel = await this.repo.findOneApparelByCode(code);
        if (!foundApparel)
            throw new AppError(APPAREL_NOT_FOUND, `No Apparel found with code ${code}`, 404);
        const sizeIndex = foundApparel.sizes.findIndex((data) => {
            return data.size === size;
        });
        if (sizeIndex === -1)
            return { isStock: false };
        if (foundApparel.sizes[sizeIndex].stockQuality >= stockQuality)
            return { isStock: true, sizeIndex };
        return { isStock: false };
    }
    async getLowestCost({ stockQuality, size, code }) {
        const { isStock, sizeIndex } = await this.checkIfStockExists({
            stockQuality,
            size,
            code,
        });
        if (!isStock)
            throw new AppError(STOCK_NOT_AVAILABLE, "Stock not available", 400);
        const foundApparel = await this.repo.findOneApparelByCode(code);
        return foundApparel.sizes[sizeIndex].price * stockQuality;
    }
}
export default ApparelService;
//# sourceMappingURL=apparel.service.js.map