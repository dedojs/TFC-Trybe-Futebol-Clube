import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import IUser from '../interfaces/IUser';

dotenv.config();

const secret = process.env.JWT_SECRET || 'jwt_secret';

export default class Jwt {
  static createToken(payload: Omit<IUser, 'password'>): string {
    const jwtConfig: jwt.SignOptions = {
      expiresIn: '6d',
      algorithm: 'HS256',
    };
    const token = jwt.sign({ data: payload }, secret, jwtConfig);
    return token;
  }

  static verifyToken(token: string) {
    try {
      const payload = jwt.verify(token, secret);
      const { data } = payload as jwt.JwtPayload;
      const { role } = data;
      return role;
    } catch (err) {
      return null;
    }
  }
}
