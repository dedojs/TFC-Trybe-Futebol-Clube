import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import User from '../database/models/Users';
import Jwt from '../utils/Jwt';

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response, Request } from 'superagent';
import { response } from 'express';
import IUser from '../interfaces/IUser';
import LoginService from '../services/loginService';

chai.use(chaiHttp);

const { expect } = chai;

const userMock: IUser = {
  id: 1,
  username: 'name',
  role: 'role',
  email: 'email',
  password: 'password'
}

const succesRequest = {
  email: 'admin@admin.com',
  password: 'teste'
}

const unauthUserRequest = {
  email: 'teste',
  password: 'teste'
}

describe('Testing login router', () => {
  // let chaiHttpResponse: Response;
  it('return status 200', async () => {
    sinon.stub(User, "findOne").resolves(userMock as User);
    const response = await chai.request(app).post('/login').send(succesRequest)
    expect(response.status).to.equal(200)
    expect
    sinon.restore()
  });

  it('return token', async () => {
    sinon.stub(Jwt, 'createToken').returns('token')
    const response = await chai.request(app).post('/login').send(succesRequest)
    expect(response.body).to.have.property('token');
    sinon.restore()
  });

  it('All fields must be filled', async () => {
    const response = await chai.request(app).post('/login').send({email: 'teste@teste.com'})
    expect(response.status).to.equal(400);
    expect(response.body.message).to.equal('All fields must be filled');
    sinon.restore()
  });
});
