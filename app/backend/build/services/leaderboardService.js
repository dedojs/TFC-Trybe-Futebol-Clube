"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Matches_1 = require("../database/models/Matches");
const Teams_1 = require("../database/models/Teams");
const helpers_1 = require("../helpers");
class LeaderBoardService {
    constructor(board = Teams_1.default) {
        this.board = board;
        this.board = board;
    }
    async finishMatch(type) {
        let leaderBoard = [];
        const matches = await this.board.findAll({
            include: [
                { model: Matches_1.default, as: `${type}`, where: { inProgress: 0 } },
            ],
        });
        const finish = matches;
        if (type === 'teamHome')
            leaderBoard = finish.map(helpers_1.leaderBoardHome);
        if (type === 'teamAway')
            leaderBoard = finish.map(helpers_1.leaderBoardAway);
        const orderLeaderBoard = leaderBoard.sort(helpers_1.orderTeams);
        return orderLeaderBoard;
    }
    async finishAllMatchs() {
        const matches = await this.board.findAll({
            include: [
                { model: Matches_1.default, as: 'teamHome', where: { inProgress: 0 } },
                { model: Matches_1.default, as: 'teamAway', where: { inProgress: 0 } },
            ],
        });
        const finish = matches;
        const leaderBoard = finish.map(helpers_1.leaderBoardAll);
        const orderLeaderBoard = leaderBoard.sort(helpers_1.orderTeams);
        return orderLeaderBoard;
    }
}
exports.default = LeaderBoardService;
//# sourceMappingURL=leaderboardService.js.map