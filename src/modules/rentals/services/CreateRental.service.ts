import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../shared/errors/AppError';
import { date } from '../../../shared/providers/Date';
import { Rental } from '../infra/typeorm/entities/Rental';
import { IRentalRepository } from '../repositories/interfaces/IRentalRepository';

interface ICreateRentalRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
export class CreateRentalService {
  private minRentReturnDate = 1;

  constructor(
    @inject('RentalRepository')
    private readonly rentalRepository: IRentalRepository
  ) {}

  async execute({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalRequest): Promise<Rental> {
    const rentedCar = await this.rentalRepository.findOpenRentalByCarId(car_id);

    if (rentedCar) {
      throw new AppError('Car is already rented!');
    }

    const userActiveRental = await this.rentalRepository.findOpenRentalByUserId(
      user_id
    );

    if (userActiveRental) {
      throw new AppError('User already has an active rental!');
    }

    const dateDiff = date.daysDiff(new Date(expected_return_date), new Date());

    if (dateDiff < this.minRentReturnDate) {
      throw new AppError('Invalid rental return date');
    }

    return this.rentalRepository.create({
      user_id,
      expected_return_date,
      car_id,
    });
  }
}
