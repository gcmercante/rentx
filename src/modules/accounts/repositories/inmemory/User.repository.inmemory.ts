import { ICreateUserDto } from '../../dto/ICreateUserDTO';
import { User } from '../../infra/typeorm/entities/User';
import { IUserRepository } from '../interfaces/IUserRepository';

export class UserRepositoryInMemory implements IUserRepository {
  private users: User[] = [];

  async create(data: ICreateUserDto): Promise<void> {
    const user = new User();

    Object.assign(user, data);

    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email);
  }
  async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }
}
