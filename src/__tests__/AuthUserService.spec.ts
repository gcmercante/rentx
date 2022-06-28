import { ICreateUserDto } from '../modules/accounts/dto/ICreateUserDTO';
import { UserRepositoryInMemory } from '../modules/accounts/repositories/inmemory/User.repository.inmemory';
import { AuthUserService } from '../modules/accounts/services/AuthUser.service';
import { CreateUserService } from '../modules/accounts/services/CreateUser.service';
import { AppError } from '../shared/errors/AppError';

let userRepository: UserRepositoryInMemory;
let createUserService: CreateUserService;
let authUserService: AuthUserService;

describe('-- Auth User Service --', () => {
  beforeEach(() => {
    userRepository = new UserRepositoryInMemory();
    createUserService = new CreateUserService(userRepository);
    authUserService = new AuthUserService(userRepository);
  });

  test('should be able to auth an user', async () => {
    const user: ICreateUserDto = {
      driver_license: '00123',
      email: 'user@example.com',
      password: '1234',
      name: 'John Doe',
    };

    await createUserService.execute(user);

    const result = await authUserService.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
    expect(result.token.length).not.toBe(0);
  });

  test('should not be able to auth when email is invalid', async () => {
    expect(async () => {
      await authUserService.execute({
        email: 'incorrect_user',
        password: '1234',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  test('should not be able to auth when password is invalid', async () => {
    const user: ICreateUserDto = {
      driver_license: '00123',
      email: 'user@example.com',
      password: '1234',
      name: 'John Doe',
    };

    await createUserService.execute(user);

    expect(async () => {
      await authUserService.execute({
        email: user.email,
        password: 'incorrect_password',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
