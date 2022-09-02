"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Jwt_1 = require("../utils/Jwt");
const Users_1 = require("../database/models/Users");
class LoginService {
    constructor(user = Users_1.default) {
        this.user = user;
        this.user = user;
    }
    async login(data) {
        const user = await this.user.findOne({ where: { email: data.email } });
        if (!user) {
            return 'null';
        }
        const token = Jwt_1.default.createToken(user);
        return token;
    }
    static validate(token) {
        const payload = Jwt_1.default.verifyToken(token);
        if (!payload)
            return 'null';
        return payload;
    }
}
exports.default = LoginService;
//# sourceMappingURL=loginService.js.map