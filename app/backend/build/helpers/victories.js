"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const victory = (matchs) => {
    console.log('1', 'aqui');
    const victories = matchs.reduce((acc, curr) => {
        if (curr.homeTeamGoals > curr.awayTeamGoals)
            return acc + 1;
        return acc;
    }, 0);
    console.log('1', victories);
    return victories;
};
exports.default = victory;
//# sourceMappingURL=victories.js.map