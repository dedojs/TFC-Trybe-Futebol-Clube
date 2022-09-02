import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import { response } from 'express';
import ITeams from '../interfaces/ITeams';
import Team from '../database/models/Teams';

chai.use(chaiHttp);

const { expect } = chai;

const mockTeam: ITeams = {
  id: 1,
  teamName: 'vasco',
}

const mockList: ITeams[] = [
  {
    "id": 1,
    "teamName": "Vasco"
  },
  {
    "id": 2,
    "teamName": "Brasil"
  }
]

describe('Testing team router', () => {
  // let chaiHttpResponse: Response;
  it('return one team and status 200', async () => {
    sinon.stub(Team, "findOne").resolves(mockTeam as Team);
    const response = await chai.request(app).get('/teams/1')
    expect(response.status).to.equal(200)
    expect
    sinon.restore()
  });

  
  it('return all teams and status 200', async () => {
    sinon.stub(Team, "findAll").resolves(mockList as Team[]);
    const response = await chai.request(app).get('/teams')
    expect(response.status).to.equal(200)
    expect
    sinon.restore()
  });

  it('Team not found and status 404', async () => {
    sinon.stub(Team, "findOne").resolves();
    const response = await chai.request(app).get('/teams/121')
    expect(response.status).to.equal(404)
    expect(response.body.message).to.equal('Team not found')
    sinon.restore()
  });
});
