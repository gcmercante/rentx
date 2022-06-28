import { container } from 'tsyringe';

import { UserRepository } from '../../modules/accounts/infra/typeorm/repository/User.repository';
import { IUserRepository } from '../../modules/accounts/repositories/interfaces/IUserRepository';
import { CategoryRepository } from '../../modules/cars/infra/typeorm/repositories/Category.repository';
import { SpecificationRepository } from '../../modules/cars/infra/typeorm/repositories/Specification.repository';
import { ICategoryRepository } from '../../modules/cars/repositories/interfaces/ICategoryRepository';
import { ISpecificationRepository } from '../../modules/cars/repositories/interfaces/ISpecificationRepository';

container.registerSingleton<ICategoryRepository>(
  'CategoryRepository',
  CategoryRepository
);

container.registerSingleton<ISpecificationRepository>(
  'SpecificationRepository',
  SpecificationRepository
);

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
