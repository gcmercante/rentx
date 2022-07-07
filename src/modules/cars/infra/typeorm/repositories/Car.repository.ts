import { Repository } from 'typeorm';

import { AppDataSource } from '../../../../../shared/infra/database';
import { ICreateCarDTO } from '../../../dtos/ICreateCarDTO';
import { IListCarDTO } from '../../../dtos/IListCarDTO';
import { ICarRepository } from '../../../repositories/interfaces/ICarRepository';
import { Car } from '../entities/Car';

export class CarRepository implements ICarRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = AppDataSource.getRepository(Car);
  }

  async findById(id: string): Promise<Car> {
    throw new Error('Method not implemented.');
  }

  async findAvailable(listOptions: IListCarDTO): Promise<Car[]> {
    const { name, brand, category_id } = listOptions;

    const availableCarsQuery = this.repository
      .createQueryBuilder()
      .where({ available: true });

    if (brand) {
      availableCarsQuery.andWhere({ brand });
    }

    if (category_id) {
      availableCarsQuery.andWhere({ category_id });
    }

    if (name) {
      availableCarsQuery.andWhere({ name });
    }

    return availableCarsQuery.getMany();
  }

  async create(data: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      ...data,
    });

    await this.repository.save(car);

    return car;
  }

  async findByLicensePlate(licensePlate: string): Promise<Car> {
    return this.repository.findOne({ where: { license_plate: licensePlate } });
  }
}
