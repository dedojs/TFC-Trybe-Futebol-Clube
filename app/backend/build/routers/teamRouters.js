"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const teamsService_1 = require("../services/teamsService");
const teamController_1 = require("../controllers/teamController");
const teamRouter = (0, express_1.Router)();
const teamService = new teamsService_1.default();
const teamController = new teamController_1.default(teamService);
teamRouter.get('/:id', (req, res, next) => teamController.findById(req, res, next));
teamRouter.get('/', (req, res, next) => teamController.listAll(req, res, next));
exports.default = teamRouter;
//# sourceMappingURL=teamRouters.js.map