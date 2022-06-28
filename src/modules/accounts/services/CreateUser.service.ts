import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../shared/errors/AppError';
import { ICreateUserDto } from '../dto/ICreateUserDTO';
import { IUserRepository } from '../repositories/interfaces/IUserRepository';

@injectable()
export class CreateUserService {
  constructor(
    @inject('UserRepository')
    private readonly userRepository: IUserRepository
  ) {}

  async execute({
    name,
    password,
    email,
    driver_license,
  }: ICreateUserDto): Promise<void> {
    const userExists = await this.userRepository.findByEmail(email);

    if (userExists) {
      throw new AppError('User already exists!');
    }
    const passwordHash = await hash(password, 8);
    const newUser = {
      name,
      password: passwordHash,
      email,
      driver_license,
    };

    await this.userRepository.create(newUser);
  }
}
