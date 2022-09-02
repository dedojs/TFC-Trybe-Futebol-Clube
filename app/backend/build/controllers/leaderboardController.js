"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LeaderBoardController {
    constructor(leaderBoardService) {
        this.leaderBoardService = leaderBoardService;
        this.leaderBoardService = leaderBoardService;
    }
    async matchHome(req, res, next) {
        try {
            const leaderBoard = await this.leaderBoardService.finishMatch('teamHome');
            return res.status(200).json(leaderBoard);
        }
        catch (err) {
            next(err);
        }
    }
    async matchAway(req, res, next) {
        try {
            const leaderBoard = await this.leaderBoardService.finishMatch('teamAway');
            return res.status(200).json(leaderBoard);
        }
        catch (err) {
            next(err);
        }
    }
    async matchAll(req, res, next) {
        try {
            const leaderBoard = await this.leaderBoardService.finishAllMatchs();
            return res.status(200).json(leaderBoard);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.default = LeaderBoardController;
//# sourceMappingURL=leaderboardController.js.map