import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '../errors/AppError';
import { UserRepository } from '../modules/accounts/repositories/User.repository';

interface IPayload {
  sub: string;
}
export async function ensureAuth(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token missing!', 401);
  }

  const [, token] = authHeader.split(' ');
  try {
    const { sub: id } = verify(
      token,
      'b7d3838bad89053d4e16ae57df86c3f3'
    ) as IPayload;

    const userResponse = new UserRepository();

    const user = userResponse.findById(id);

    if (!user) {
      throw new AppError('User does not exist!', 401);
    }

    request.user = { id };

    next();
  } catch (error) {
    throw new AppError('Invalid token!', 401);
  }
}
