const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);

class SpeakerService {
    constructor(dataFile) {
        this.dataFile = dataFile;
    }

    async getNames() {
        const data = await this.getData();
        return data.map(speaker => {
            return {
                name: speaker.name,
                shortName: speaker.shortname
            }
        });
    }

    async getListShort() {
        const data = await this.getData();
        return data.map(speaker => {
            return {
                name: speaker.name,
                shortName: speaker.shortname,
                title: speaker.title
            };
        });
    }

    async getData() {
        const data = await readFile(this.dataFile, "utf8");
        if (!data) {
            return [];
        }
        return JSON.parse(data).speakers;
    }
};

module.exports = SpeakerService;