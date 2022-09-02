"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const draw = (matchs) => {
    const draws = matchs.reduce((acc, curr) => {
        if (curr.homeTeamGoals === curr.awayTeamGoals)
            return acc + 1;
        return acc;
    }, 0);
    return draws;
};
exports.default = draw;
//# sourceMappingURL=draws.js.map