"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Jwt_1 = require("../utils/Jwt");
const tokenValidate = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token)
            return res.status(401).json({ message: 'Token must be a valid token' });
        if (token) {
            const payload = Jwt_1.default.verifyToken(token);
            if (!payload || payload === null) {
                return res.status(401).json({ message: 'Token must be a valid token' });
            }
            return next();
        }
        next();
    }
    catch (err) {
        next(err);
    }
};
exports.default = tokenValidate;
//# sourceMappingURL=tokenValidate.js.map