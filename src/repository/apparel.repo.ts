import fs from "fs";
import { Apparel } from "../interfaces/apparel.interface.js";

const filePath = "src/data/apparel.json";

class ApparelRepository {
  async findOneApparelByCode(code: string) {
    const { apparels } = await this.readJsonFile();

    const filteredApparel = apparels.filter((apparel) => {
      return apparel.code === code;
    });

    return filteredApparel[0];
  }

  async updateOneApparel({ size, code, stockQuality, price }) {
    const { apparels } = await this.readJsonFile();

    let apparelIndex = apparels.findIndex((apparel) => {
      return apparel.code === code;
    });

    let sizeIndex = apparels[apparelIndex].sizes.findIndex((data) => {
      return data.size === size;
    });

    if (sizeIndex !== -1) {
      apparels[apparelIndex].sizes[sizeIndex].stockQuality = stockQuality;
      apparels[apparelIndex].sizes[sizeIndex].price = price;
    } else {
      const newSize = { size, stockQuality, price };
      apparels[apparelIndex].sizes.push(newSize);
    }

    await this.writeJsonFile(apparels);
  }

  async readJsonFile(): Promise<{ apparels: Apparel[] }> {
    const apparels = await fs.promises.readFile(filePath, "utf8");

    const data = JSON.parse(apparels);

    return { apparels: data.apparels };
  }

  async writeJsonFile(apparels: Apparel[]) {
    return await fs.promises.writeFile(
      filePath,
      JSON.stringify({ apparels }),
      "utf8"
    );
  }
}

export default ApparelRepository;
