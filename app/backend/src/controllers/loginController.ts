import { Request, Response, NextFunction } from 'express';
import LoginService from '../services/loginService';
import Login from '../interfaces/ILogin';

// o login service é chamado fora do construtor e instanciado na classe
export default class LoginController {
  private loginService: Login;
  constructor() {
    this.loginService = new LoginService();
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: 'All fields must be filled' });
      }
      const token = await this.loginService.login(req.body);

      if (token === 'null') {
        return res.status(401).json({ message: 'Incorrect email or password' });
      }

      return res.status(200).json({ token });
    } catch (err) {
      next(err);
    }
  }

  static async loginValidade(req: Request, res: Response) {
    const token = req.headers.authorization;
    let role = '';
    if (token) {
      role = LoginService.validate(token);
    }
    if (!token) return res.status(400).json({ message: 'Token invalid' });
    return res.status(200).json({ role });
  }
}
