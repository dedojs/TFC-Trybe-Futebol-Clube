"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = require(".");
const Teams_1 = require("./Teams");
class Matches extends sequelize_1.Model {
}
Matches.init({
    id: {
        type: sequelize_1.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    homeTeam: {
        type: sequelize_1.INTEGER,
        allowNull: false,
    },
    homeTeamGoals: {
        type: sequelize_1.INTEGER,
        allowNull: false,
    },
    awayTeam: {
        type: sequelize_1.INTEGER,
        allowNull: false,
    },
    awayTeamGoals: {
        type: sequelize_1.INTEGER,
        allowNull: false,
    },
    inProgress: {
        type: sequelize_1.BOOLEAN,
        allowNull: false,
    },
}, {
    underscored: true,
    sequelize: _1.default,
    modelName: 'matches',
    timestamps: false,
});
// relacionamento visto na aula da turma xp, revisao com sequelize e no exemplo pre definido
Teams_1.default.hasMany(Matches, { foreignKey: 'homeTeam', as: 'teamHome' });
Matches.belongsTo(Teams_1.default, { foreignKey: 'homeTeam', as: 'teamHome' });
Teams_1.default.hasMany(Matches, { foreignKey: 'awayTeam', as: 'teamAway' });
Matches.belongsTo(Teams_1.default, { foreignKey: 'awayTeam', as: 'teamAway' });
exports.default = Matches;
//# sourceMappingURL=Matches.js.map