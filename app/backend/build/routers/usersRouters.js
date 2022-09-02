"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersService_1 = require("../services/usersService");
const usersController_1 = require("../controllers/usersController");
const usersService = new usersService_1.default();
const usersController = new usersController_1.default(usersService);
const router = (0, express_1.Router)();
router.get('/login', (req, res, next) => usersController.login(req, res, next));
exports.default = router;
//# sourceMappingURL=usersRouters.js.map