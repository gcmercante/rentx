import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../errors/AppError';
import { IUserRepository } from '../repositories/interfaces/IUserRepository';

interface IAuthRequest {
  email: string;
  password: string;
}

interface IAuthResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
export class AuthUserService {
  constructor(
    @inject('UserRepository')
    private readonly userRepository: IUserRepository
  ) {}

  async execute({ email, password }: IAuthRequest): Promise<IAuthResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email or password incorrect');
    }

    const isValidPassword = await compare(password, user.password);

    if (!isValidPassword) {
      throw new AppError('Email or password incorrect');
    }

    const token = sign({}, 'b7d3838bad89053d4e16ae57df86c3f3', {
      subject: user.id,
      expiresIn: '1d',
    });

    const auth: IAuthResponse = {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    };

    return auth;
  }
}
