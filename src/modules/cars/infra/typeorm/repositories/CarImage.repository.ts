import { Repository } from 'typeorm';

import { AppDataSource } from '../../../../../shared/infra/database';
import { IUploadCarImageDTO } from '../../../dtos/IUploadCarImageDTO';
import { ICarImageRepository } from '../../../repositories/interfaces/ICarImageRepository';
import { CarImage } from '../entities/CarImage';

export class CarImageRepository implements ICarImageRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = AppDataSource.getRepository(CarImage);
  }

  async create({ car_id, image_name }: IUploadCarImageDTO): Promise<CarImage> {
    const carImg = this.repository.create({ car_id, image_name });

    await this.repository.save(carImg);

    return carImg;
  }
}
