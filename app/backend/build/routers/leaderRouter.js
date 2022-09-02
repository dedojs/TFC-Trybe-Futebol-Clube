"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const leaderboardService_1 = require("../services/leaderboardService");
const leaderboardController_1 = require("../controllers/leaderboardController");
const leaderBoardService = new leaderboardService_1.default();
const leaderBoardController = new leaderboardController_1.default(leaderBoardService);
const leaderRouter = (0, express_1.Router)();
leaderRouter.get('/home', (req, res, next) => leaderBoardController.matchHome(req, res, next));
leaderRouter.get('/away', (req, res, next) => leaderBoardController.matchAway(req, res, next));
leaderRouter.get('/', (req, res, next) => leaderBoardController.matchAll(req, res, next));
exports.default = leaderRouter;
//# sourceMappingURL=leaderRouter.js.map