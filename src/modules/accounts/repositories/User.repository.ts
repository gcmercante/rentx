import { Repository } from 'typeorm';

import { AppDataSource } from '../../../database';
import { ICreateUserDto } from '../dto/ICreateUserDTO';
import { User } from '../entities/User';
import { IUserRepository } from './interfaces/IUserRepository';

export class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async findById(id: string): Promise<User> {
    return this.repository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User> {
    return this.repository.findOne({ where: { email } });
  }

  async create(user: ICreateUserDto): Promise<void> {
    const newUser = this.repository.create(user);

    await this.repository.save(newUser);
  }
}
