"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const secret = process.env.JWT_SECRET || 'jwt_secret';
class Jwt {
    static createToken(payload) {
        const jwtConfig = {
            expiresIn: '6d',
            algorithm: 'HS256',
        };
        const token = jwt.sign({ data: payload }, secret, jwtConfig);
        return token;
    }
    static verifyToken(token) {
        try {
            const payload = jwt.verify(token, secret);
            const { data } = payload;
            const { role } = data;
            return role;
        }
        catch (err) {
            return null;
        }
    }
}
exports.default = Jwt;
//# sourceMappingURL=Jwt.js.map