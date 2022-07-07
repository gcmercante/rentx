import { ICreateCarDTO } from '../../dtos/ICreateCarDTO';
import { IListCarDTO } from '../../dtos/IListCarDTO';
import { Car } from '../../infra/typeorm/entities/Car';

export interface ICarRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(licensePlate: string): Promise<Car>;
  findAvailable(data: IListCarDTO): Promise<Car[]>;
  findById(id: string): Promise<Car>;
}
