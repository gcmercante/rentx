import { container } from 'tsyringe';

import { UserRepository } from '../../modules/accounts/infra/typeorm/repository/User.repository';
import { IUserRepository } from '../../modules/accounts/repositories/interfaces/IUserRepository';
import { CarRepository } from '../../modules/cars/infra/typeorm/repositories/Car.repository';
import { CarImageRepository } from '../../modules/cars/infra/typeorm/repositories/CarImage.repository';
import { CategoryRepository } from '../../modules/cars/infra/typeorm/repositories/Category.repository';
import { SpecificationRepository } from '../../modules/cars/infra/typeorm/repositories/Specification.repository';
import { ICarImageRepository } from '../../modules/cars/repositories/interfaces/ICarImageRepository';
import { ICarRepository } from '../../modules/cars/repositories/interfaces/ICarRepository';
import { ICategoryRepository } from '../../modules/cars/repositories/interfaces/ICategoryRepository';
import { ISpecificationRepository } from '../../modules/cars/repositories/interfaces/ISpecificationRepository';
import { RentalRepository } from '../../modules/rentals/infra/typeorm/repositories/Rental.repository';
import { IRentalRepository } from '../../modules/rentals/repositories/interfaces/IRentalRepository';

container.registerSingleton<ICategoryRepository>(
  'CategoryRepository',
  CategoryRepository
);

container.registerSingleton<ISpecificationRepository>(
  'SpecificationRepository',
  SpecificationRepository
);

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<ICarRepository>('CarRepository', CarRepository);

container.registerSingleton<ICarImageRepository>(
  'CarImageRepository',
  CarImageRepository
);

container.registerSingleton<IRentalRepository>(
  'RentalRepository',
  RentalRepository
);
