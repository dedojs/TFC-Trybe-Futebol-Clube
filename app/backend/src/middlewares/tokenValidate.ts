import { Request, Response, NextFunction } from 'express';
import Jwt from '../utils/Jwt';

const tokenValidate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'Token must be a valid token' });
    if (token) {
      const payload = Jwt.verifyToken(token);
      if (!payload || payload === null) {
        return res.status(401).json({ message: 'Token must be a valid token' });
      }
      return next();
    }
    next();
  } catch (err) {
    next(err);
  }
};

export default tokenValidate;
