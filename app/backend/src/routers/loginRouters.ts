import { Router } from 'express';
// import LoginService from '../services/loginService';
import LoginController from '../controllers/loginController';

const loginRouter = Router();
// const loginService = new LoginService();
// o login service nao foi lançado no construtor, porem foi instaciado dentro dele.
const loginController = new LoginController();

loginRouter.post('/', (req, res, next) => loginController.login(req, res, next));
loginRouter.get('/validate', (req, res) => LoginController.loginValidade(req, res));

export default loginRouter;
