"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.App = void 0;
const express = require("express");
const loginRouters_1 = require("./routers/loginRouters");
const matcRouters_1 = require("./routers/matcRouters");
const teamRouters_1 = require("./routers/teamRouters");
const leaderRouter_1 = require("./routers/leaderRouter");
class App {
    constructor() {
        this.app = express();
        this.config();
        // Não remover essa rota
        this.app.get('/', (req, res) => res.json({ ok: true }));
    }
    config() {
        const accessControl = (_req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
            res.header('Access-Control-Allow-Headers', '*');
            next();
        };
        this.app.use(express.json());
        this.app.use(accessControl);
        this.app.use('/login', loginRouters_1.default);
        this.app.use('/teams', teamRouters_1.default);
        this.app.use('/matches', matcRouters_1.default);
        this.app.use('/leaderboard/', leaderRouter_1.default);
    }
    start(PORT) {
        this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
    }
}
exports.App = App;
// A execução dos testes de cobertura depende dessa exportação
exports.app = new App().app;
//# sourceMappingURL=app.js.map