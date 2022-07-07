import { IUploadCarImageDTO } from '../../dtos/IUploadCarImageDTO';
import { CarImage } from '../../infra/typeorm/entities/CarImage';

export interface ICarImageRepository {
  create({ car_id, image_name }: IUploadCarImageDTO): Promise<CarImage>;
}
