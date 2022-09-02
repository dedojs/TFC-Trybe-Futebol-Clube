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
import IMatches from '../interfaces/IMatches';
import MatchService from '../services/matchesService';

chai.use(chaiHttp);

const { expect } = chai;

const mockMatch: IMatches = {
  "id": 4,
  "homeTeam": 3,
  "homeTeamGoals": 0,
  "awayTeam": 2,
  "awayTeamGoals": 0,
  "inProgress": true,
  "teamHome": {
    "teamName": "Botafogo"
  },
  "teamAway": {
    "teamName": "Bahia"
  }
}

const match = {
  "homeTeam": 3,
  "awayTeam": 2,
  "homeTeamGoals": 0,
  "awayTeamGoals": 0,
}

const mockNewMatch = {
  "id": 49,
  "homeTeam": 3,
  "awayTeam": 2,
  "homeTeamGoals": 0,
  "awayTeamGoals": 0,
  "inProgress": true
}

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJwYXNzd29yZCI6IiQyYSQwOCR4aS5IeGsxY3pBTzBuWlIuLkIzOTN1MTBhRUQwUlExTjNQQUVYUTdIeHRMaktQRVpCdS5QVyJ9LCJpYXQiOjE2NjEwMzQzNjYsImV4cCI6MTY2MTU1Mjc2Nn0.82dCchPEnofc6vuu26MCDp2YubTk_qeX-fZ5s1PNeLc'

const errMock: ErrorRequestHandler = async (err, _req, res, _next) => {
  const { status, message } = err;
  return res.status(status).json({ message });
}

describe('Testing matches router', () => {
  // let chaiHttpResponse: Response;
  it('return status 200, list all matches', async () => {
    sinon.stub(Matches, "findAll").resolves(mockMatch as unknown as Matches[]);
    const response = await chai.request(app).get('/matches')
    expect(response.status).to.equal(200)
    expect
    sinon.restore()
  });

  it('return status 401, Token must be a valid token', async () => {
    sinon.stub(Matches, "create").resolves(mockNewMatch as Matches)
    const response = await chai.request(app).post('/matches').send(match)
    expect(response.status).to.equal(401)
    expect(response.body.message).to.equal('Token must be a valid token')
    expect
    sinon.restore()
  });

  it('return status 201, Create match succesful', async () => {
    sinon.stub(Matches, "create").resolves(mockNewMatch as Matches)

    const response = await chai.request(app).post('/matches').send(match).set({Authorization: token})
    
    expect(response.status).to.equal(201)
    sinon.restore()
  });

  it('return status 200, Update status inProgress', async () => {
    sinon.stub(MatchService.prototype, "updateProgress").resolves()
    const response = await chai.request(app).patch('/matches/:id/finish').set({Authorization: token})
    expect(response.status).to.equal(200)
    expect(response.body.message).to.equal('Finished')
    expect
    sinon.restore()
  });

  it('return status 200, Update Goals', async () => {
    sinon.stub(MatchService.prototype, "updateGoals").resolves()
    const response = await chai.request(app).patch('/matches/:id').send({
      "homeTeamGoals": 3,
      "awayTeamGoals": 1
    }).set({Authorization: token})
    expect(response.status).to.equal(200)
    
    expect
    sinon.restore()
  });
  
});
