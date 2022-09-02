"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Teams_1 = require("../database/models/Teams");
const Matches_1 = require("../database/models/Matches");
class MatchService {
    constructor(match = Matches_1.default) {
        this.match = match;
        this.match = match;
    }
    // aula xp revisao com sequelize
    // o atribute quando passado define exatamente o que queremos
    async getAll() {
        const matches = this.match.findAll({
            include: [
                { model: Teams_1.default, as: 'teamHome', attributes: ['teamName'] },
                { model: Teams_1.default, as: 'teamAway', attributes: ['teamName'] },
            ],
        });
        return matches;
    }
    async create(data) {
        const homeTeam = await this.match.findOne({ where: { id: data.homeTeam } });
        const awayTeam = await this.match.findOne({ where: { id: data.awayTeam } });
        if (data.homeTeam === data.awayTeam)
            return 'sameteam';
        if (!homeTeam || !awayTeam) {
            return null;
        }
        const newMatch = await this.match.create({ ...data, inProgress: true });
        return newMatch;
    }
    async updateProgress(id) {
        await this.match.update({ inProgress: false }, { where: { id } });
    }
    async updateGoals(id, data) {
        await this.match.update({ ...data }, { where: { id } });
    }
}
exports.default = MatchService;
//# sourceMappingURL=matchesService.js.map