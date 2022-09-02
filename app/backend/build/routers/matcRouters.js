"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import MatchService from '../services/matchesService';
const tokenValidate_1 = require("../middlewares/tokenValidate");
const matchesController_1 = require("../controllers/matchesController");
const matchRouter = (0, express_1.Router)();
// const matchService = new MatchService();
const matchController = new matchesController_1.default();
matchRouter
    .patch('/:id/finish', tokenValidate_1.default, (req, res, next) => matchController
    .updateProgress(req, res, next));
matchRouter
    .patch('/:id', tokenValidate_1.default, (req, res, next) => matchController
    .updateGoals(req, res, next));
matchRouter.get('/', (req, res, next) => matchController.getAll(req, res, next));
matchRouter.post('/', tokenValidate_1.default, (req, res, next) => matchController.create(req, res, next));
exports.default = matchRouter;
//# sourceMappingURL=matcRouters.js.map