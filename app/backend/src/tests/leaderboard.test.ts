import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import Matches from '../database/models/Matches';
import Jwt from '../utils/Jwt';

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response, Request, ErrorRequestHandler } from 'express';
import { response } from 'express';
import ILeaderboard from '../interfaces/ILeaderboard';
import LeaderBoardService from '../services/leaderboardService';

chai.use(chaiHttp);

const { expect } = chai;

const mockLeaderBoard = [
	{
		"name": "Santos",
		"totalPoints": 9,
		"totalGames": 3,
		"totalVictories": 3,
		"totalDraws": 0,
		"totalLosses": 0,
		"goalsFavor": 9,
		"goalsOwn": 3,
		"goalsBalance": 6,
		"efficiency": 100
	},
	{
		"name": "Corinthians",
		"totalPoints": 9,
		"totalGames": 3,
		"totalVictories": 3,
		"totalDraws": 0,
		"totalLosses": 0,
		"goalsFavor": 8,
		"goalsOwn": 2,
		"goalsBalance": 6,
		"efficiency": 100
	}];

describe('Testing leaderboards router', () => {
  // let chaiHttpResponse: Response;
  it('return status 200, leaderboards', async () => {
    sinon.stub(LeaderBoardService.prototype, "finishAllMatchs").resolves(mockLeaderBoard as unknown as ILeaderboard[]);
    const response = await chai.request(app).get('/leaderboard')
    expect(response.status).to.equal(200)
    sinon.restore()
  });

  it('return status 200, leaderboards/away', async () => {
    sinon.stub(Matches, "findAll").resolves(mockLeaderBoard as unknown as Matches[]);
    const response = await chai.request(app).get('/leaderboard/away')
    expect(response.status).to.equal(200)
    sinon.restore()
  });

  it('return status 200, leaderboards/home', async () => {
    sinon.stub(Matches, "findAll").resolves(mockLeaderBoard as unknown as Matches[]);
    const response = await chai.request(app).get('/leaderboard/home')
    expect(response.status).to.equal(200)
    sinon.restore()
  });
  
});
