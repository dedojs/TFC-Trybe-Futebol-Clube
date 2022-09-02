"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LoginController {
    constructor(loginService) {
        this.loginService = loginService;
        this.loginService = loginService;
    }
    async login(req, res, next) {
        try {
            const token = await this.loginService.login(req.body);
            return res.status(200).json({ token });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.default = LoginController;
//# sourceMappingURL=usersController.js.map