import { Request, Response, NextFunction } from 'express';

import { UserRepository } from '../../../../modules/accounts/infra/typeorm/repository/User.repository';
import { AppError } from '../../../errors/AppError';

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { id } = request.user;

  const userRepository = new UserRepository();
  const user = await userRepository.findById(id);

  if (!user.is_admin) {
    throw new AppError('User is not an admin');
  }

  return next();
}
