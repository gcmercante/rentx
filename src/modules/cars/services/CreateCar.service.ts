import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../shared/errors/AppError';
import { Car } from '../infra/typeorm/entities/Car';
import { ICarRepository } from '../repositories/interfaces/ICarRepository';
import { ISpecificationRepository } from '../repositories/interfaces/ISpecificationRepository';

interface ICreateCarRequest {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
  specifications?: string[];
}

@injectable()
export class CreateCarService {
  constructor(
    @inject('CarRepository')
    private readonly carRepository: ICarRepository,
    @inject('SpecificationRepository')
    private readonly specRepository: ISpecificationRepository
  ) {}

  async execute(data: ICreateCarRequest): Promise<Car> {
    const {
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    } = data;
    const carExists = await this.carRepository.findByLicensePlate(
      license_plate
    );

    if (carExists) {
      throw new AppError('Car already exists');
    }

    const specifications = await this.specRepository.findByIds(
      data.specifications
    );

    const car = await this.carRepository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
      specifications,
    });

    return car;
  }
}
