import { container } from 'tsyringe';

import { IUserRepository } from '../../modules/accounts/repositories/interfaces/IUserRepository';
import { UserRepository } from '../../modules/accounts/repositories/User.repository';
import { CategoryRepository } from '../../modules/cars/repositories/Category.repository';
import { ICategoryRepository } from '../../modules/cars/repositories/interfaces/ICategoryRepository';
import { ISpecificationRepository } from '../../modules/cars/repositories/interfaces/ISpecificationRepository';
import { SpecificationRepository } from '../../modules/cars/repositories/Specification.repository';

container.registerSingleton<ICategoryRepository>(
  'CategoryRepository',
  CategoryRepository
);

container.registerSingleton<ISpecificationRepository>(
  'SpecificationRepository',
  SpecificationRepository
);

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
