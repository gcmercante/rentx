import { IUploadCarImageDTO } from '../../dtos/IUploadCarImageDTO';
import { CarImage } from '../../infra/typeorm/entities/CarImage';
import { ICarImageRepository } from '../interfaces/ICarImageRepository';

export class CarImageRepositoryInMemory implements ICarImageRepository {
  private carImages: CarImage[] = [];

  async create({ car_id, image_name }: IUploadCarImageDTO): Promise<CarImage> {
    const carImg = new CarImage();

    Object.assign(carImg, { car_id, image_name });

    return carImg;
  }
}
