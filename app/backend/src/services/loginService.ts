import Jwt from '../utils/Jwt';
import User from '../database/models/Users';

import Login, { LoginData } from '../interfaces/ILogin';

export default class LoginService implements Login {
  constructor(private user = User) {
    this.user = user;
  }

  async login(data: LoginData): Promise<string | void> {
    const user = await this.user.findOne({ where: { email: data.email } });
    if (!user) {
      return 'null';
    }
    const token = Jwt.createToken(user);
    return token;
  }

  static validate(token: string) {
    const payload = Jwt.verifyToken(token);
    if (!payload) return 'null';
    return payload;
  }
}
