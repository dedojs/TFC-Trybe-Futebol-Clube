"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leaderBoardAll = exports.leaderBoardAway = exports.leaderBoardHome = exports.orderTeams = exports.points = exports.goalAway = exports.goalHome = exports.defeat = exports.draw = exports.victory = void 0;
const victory = (type, matchs) => {
    let victories = 0;
    if (type === 'teamHome') {
        victories = matchs.reduce((acc, curr) => {
            if (curr.homeTeamGoals > curr.awayTeamGoals)
                return acc + 1;
            return acc;
        }, 0);
    }
    if (type === 'teamAway') {
        victories = matchs.reduce((acc, curr) => {
            if (curr.homeTeamGoals < curr.awayTeamGoals)
                return acc + 1;
            return acc;
        }, 0);
    }
    return victories;
};
exports.victory = victory;
const draw = (matchs) => {
    const draws = matchs.reduce((acc, curr) => {
        if (curr.homeTeamGoals === curr.awayTeamGoals)
            return acc + 1;
        return acc;
    }, 0);
    return draws;
};
exports.draw = draw;
const defeat = (type, matchs) => {
    let losses = 0;
    if (type === 'teamHome') {
        losses = matchs.reduce((acc, curr) => {
            if (curr.homeTeamGoals < curr.awayTeamGoals)
                return acc + 1;
            return acc;
        }, 0);
    }
    if (type === 'teamAway') {
        losses = matchs.reduce((acc, curr) => {
            if (curr.homeTeamGoals > curr.awayTeamGoals)
                return acc + 1;
            return acc;
        }, 0);
    }
    return losses;
};
exports.defeat = defeat;
const goalHome = (matchs) => {
    const goalsFavor = matchs.reduce((acc, curr) => acc + curr.homeTeamGoals, 0);
    return goalsFavor;
};
exports.goalHome = goalHome;
const goalAway = (matchs) => {
    const goalsOwn = matchs.reduce((acc, curr) => acc + curr.awayTeamGoals, 0);
    return goalsOwn;
};
exports.goalAway = goalAway;
const points = (type, matchs) => {
    const victories = (0, exports.victory)(type, matchs);
    const draws = (0, exports.draw)(matchs);
    const point = victories * 3 + draws;
    return point;
};
exports.points = points;
const orderTeams = (a, b) => {
    if (a.totalPoints < b.totalPoints) {
        return 1;
    }
    if (a.totalPoints > b.totalPoints) {
        return -1;
    }
    if (a.totalVictories < b.totalVictories) {
        return 1;
    }
    if (a.totalVictories > b.totalVictories) {
        return -1;
    }
    if (a.goalsBalance < b.goalsBalance) {
        return 1;
    }
    if (a.goalsBalance > b.goalsBalance) {
        return -1;
    }
    if (a.goalsFavor < b.goalsFavor) {
        return 1;
    }
    if (a.goalsFavor > b.goalsFavor) {
        return -1;
    }
    if (a.goalsOwn < b.goalsOwn) {
        return 1;
    }
    if (a.goalsOwn > b.goalsOwn) {
        return -1;
    }
    return 0;
};
exports.orderTeams = orderTeams;
const leaderBoardHome = ({ teamName, teamHome }) => ({
    name: teamName,
    totalPoints: (0, exports.points)('teamHome', teamHome),
    totalGames: teamHome.length,
    totalVictories: (0, exports.victory)('teamHome', teamHome),
    totalDraws: (0, exports.draw)(teamHome),
    totalLosses: (0, exports.defeat)('teamHome', teamHome),
    goalsFavor: (0, exports.goalHome)(teamHome),
    goalsOwn: (0, exports.goalAway)(teamHome),
    goalsBalance: (0, exports.goalHome)(teamHome) - (0, exports.goalAway)(teamHome),
    efficiency: Number((((0, exports.points)('teamHome', teamHome) / (teamHome.length * 3)) * 100).toFixed(2)),
});
exports.leaderBoardHome = leaderBoardHome;
const leaderBoardAway = ({ teamName, teamAway }) => ({
    name: teamName,
    totalPoints: (0, exports.points)('teamAway', teamAway),
    totalGames: teamAway.length,
    totalVictories: (0, exports.victory)('teamAway', teamAway),
    totalDraws: (0, exports.draw)(teamAway),
    totalLosses: (0, exports.defeat)('teamAway', teamAway),
    goalsFavor: (0, exports.goalAway)(teamAway),
    goalsOwn: (0, exports.goalHome)(teamAway),
    goalsBalance: (0, exports.goalAway)(teamAway) - (0, exports.goalHome)(teamAway),
    efficiency: Number((((0, exports.points)('teamAway', teamAway) / (teamAway.length * 3)) * 100).toFixed(2)),
});
exports.leaderBoardAway = leaderBoardAway;
const efficiency = (teamHome, teamAway) => {
    const point = (0, exports.points)('teamAway', teamAway) + (0, exports.points)('teamHome', teamHome);
    const matchs = (teamHome.length + teamAway.length) * 3;
    const eff = Number(((point / matchs) * 100).toFixed(2));
    return eff;
};
const leaderBoardAll = ({ teamName, teamHome, teamAway }) => ({
    name: teamName,
    totalPoints: (0, exports.points)('teamAway', teamAway) + (0, exports.points)('teamHome', teamHome),
    totalGames: teamAway.length + teamHome.length,
    totalVictories: (0, exports.victory)('teamAway', teamAway) + (0, exports.victory)('teamHome', teamHome),
    totalDraws: (0, exports.draw)(teamAway) + (0, exports.draw)(teamHome),
    totalLosses: (0, exports.defeat)('teamAway', teamAway) + (0, exports.defeat)('teamHome', teamHome),
    goalsFavor: (0, exports.goalHome)(teamHome) + (0, exports.goalAway)(teamAway),
    goalsOwn: (0, exports.goalHome)(teamAway) + (0, exports.goalAway)(teamHome),
    goalsBalance: (0, exports.goalAway)(teamAway) - (0, exports.goalHome)(teamAway) + (0, exports.goalHome)(teamHome) - (0, exports.goalAway)(teamHome),
    efficiency: efficiency(teamHome, teamAway),
});
exports.leaderBoardAll = leaderBoardAll;
//# sourceMappingURL=index.js.map