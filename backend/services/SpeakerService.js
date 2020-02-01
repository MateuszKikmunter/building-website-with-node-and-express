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

    async getList() {
        const data = await this.getData();
        return data.map(speaker => {
            return {
                name: speaker.name,
                shortName: speaker.shortname,
                title: speaker.title,
                summary: speaker.summary
            };
        });
    }

    async getSpeakerByName(speakerName) {
        const data = await this.getList();
        return data.find(speaker => speaker.shortName === speakerName) || undefined;
    }

    async getSpeakerArtwork(speakerName) {
        const artwork = await this.getAllArtwork();
        return artwork.filter(art => art.includes(speakerName)) || [];
    }

    async getAllArtwork() {
        const data = await this.getData();
        const artwork = data.reduce((acc, elem) => {
            if (elem.artwork) {
                acc = [...acc, ...elem.artwork];
            }

            return acc;
        }, []);

        return artwork;
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