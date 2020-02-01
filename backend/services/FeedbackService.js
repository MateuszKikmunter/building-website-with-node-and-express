const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);

class FeedbackService {
    constructor(dataFile) {
        this.dataFile = dataFile;
    }

    async getList() {
        return await this.getData();
    }

    async getData() {
        const data = await readFile(this.dataFile, "utf8");
        if (!data) {
            return [];
        }
        return JSON.parse(data);
    }
};

module.exports = FeedbackService;