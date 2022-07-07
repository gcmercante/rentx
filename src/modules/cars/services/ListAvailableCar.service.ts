import { inject, injectable } from 'tsyringe';

import { IListCarDTO } from '../dtos/IListCarDTO';
import { Car } from '../infra/typeorm/entities/Car';
import { ICarRepository } from '../repositories/interfaces/ICarRepository';

@injectable()
export class ListAvailableCarService {
  constructor(
    @inject('CarRepository')
    private readonly carRepository: ICarRepository
  ) {}

  async execute(listCarProp: IListCarDTO): Promise<Car[]> {
    const cars = await this.carRepository.findAvailable(listCarProp);

    return cars;
  }
}
