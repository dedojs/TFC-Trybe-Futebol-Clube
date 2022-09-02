"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loginService_1 = require("../services/loginService");
// o login service é chamado fora do construtor e instanciado na classe
class LoginController {
    constructor() {
        this.loginService = new loginService_1.default();
    }
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: 'All fields must be filled' });
            }
            const token = await this.loginService.login(req.body);
            if (token === 'null') {
                return res.status(401).json({ message: 'Incorrect email or password' });
            }
            return res.status(200).json({ token });
        }
        catch (err) {
            next(err);
        }
    }
    static async loginValidade(req, res) {
        const token = req.headers.authorization;
        let role = '';
        if (token) {
            role = loginService_1.default.validate(token);
        }
        if (!token)
            return res.status(400).json({ message: 'Token invalid' });
        return res.status(200).json({ role });
    }
}
exports.default = LoginController;
//# sourceMappingURL=loginController.js.map