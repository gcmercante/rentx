import { inject, injectable } from 'tsyringe';

import { CarImage } from '../infra/typeorm/entities/CarImage';
import { ICarImageRepository } from '../repositories/interfaces/ICarImageRepository';

interface IUploadCarImageRequest {
  car_id: string;
  image_names: string[];
}

@injectable()
export class UploadCarImageService {
  constructor(
    @inject('CarImageRepository')
    private readonly carImageRepository: ICarImageRepository
  ) {}

  async execute(data: IUploadCarImageRequest): Promise<CarImage[]> {
    const { car_id, image_names } = data;
    const promises: Promise<CarImage>[] = [];

    image_names.forEach((image_name) => {
      promises.push(this.carImageRepository.create({ car_id, image_name }));
    });

    const carImages = await Promise.all(promises);

    return carImages;
  }
}
