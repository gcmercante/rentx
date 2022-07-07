import { Repository } from 'typeorm';

import { AppDataSource } from '../../../../../shared/infra/database';
import { ICreateRentalDTO } from '../../../dtos/ICreateRentalDTO';
import { IRentalRepository } from '../../../repositories/interfaces/IRentalRepository';
import { Rental } from '../entities/Rental';

export class RentalRepository implements IRentalRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = AppDataSource.getRepository(Rental);
  }
  async findOpenRentalByCarId(car_id: string): Promise<Rental> {
    return this.repository.findOne({ where: { car_id } });
  }
  async findOpenRentalByUserId(user_id: string): Promise<Rental> {
    return this.repository.findOne({ where: { user_id } });
  }
  async create(data: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({ ...data });

    await this.repository.save(rental);

    return rental;
  }
}
