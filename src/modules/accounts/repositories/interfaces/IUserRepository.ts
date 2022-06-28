import { ICreateUserDto } from '../../dto/ICreateUserDTO';
import { User } from '../../infra/typeorm/entities/User';

export interface IUserRepository {
  create(data: ICreateUserDto): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}
