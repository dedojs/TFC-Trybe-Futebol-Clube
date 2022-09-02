"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import LoginService from '../services/loginService';
const loginController_1 = require("../controllers/loginController");
const loginRouter = (0, express_1.Router)();
// const loginService = new LoginService();
// o login service nao foi lançado no construtor, porem foi instaciado dentro dele.
const loginController = new loginController_1.default();
loginRouter.post('/', (req, res, next) => loginController.login(req, res, next));
loginRouter.get('/validate', (req, res) => loginController_1.default.loginValidade(req, res));
exports.default = loginRouter;
//# sourceMappingURL=loginRouters.js.map