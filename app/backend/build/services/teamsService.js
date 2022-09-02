"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Teams_1 = require("../database/models/Teams");
class TeamService {
    constructor(team = Teams_1.default) {
        this.team = team;
        this.team = team;
    }
    async listAll() {
        const teams = await this.team.findAll();
        return teams;
    }
    async findById(id) {
        const team = await this.team.findByPk(id);
        return team;
    }
}
exports.default = TeamService;
//# sourceMappingURL=teamsService.js.map