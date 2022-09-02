"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TeamController {
    constructor(teamService) {
        this.teamService = teamService;
        this.teamService = teamService;
    }
    async listAll(req, res, next) {
        try {
            const team = await this.teamService.listAll();
            return res.status(200).json(team);
        }
        catch (err) {
            next(err);
        }
    }
    async findById(req, res, next) {
        try {
            const team = await this.teamService.findById(Number(req.params.id));
            if (!team) {
                return res.status(404).json({ message: 'Team not found' });
            }
            return res.status(200).json(team);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.default = TeamController;
//# sourceMappingURL=teamController.js.map