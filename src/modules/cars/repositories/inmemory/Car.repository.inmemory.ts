import { ICreateCarDTO } from '../../dtos/ICreateCarDTO';
import { IListCarDTO } from '../../dtos/IListCarDTO';
import { Car } from '../../infra/typeorm/entities/Car';
import { ICarRepository } from '../interfaces/ICarRepository';

export class CarRepositoryInMemory implements ICarRepository {
  private cars: Car[] = [];

  async findById(id: string): Promise<Car> {
    return this.cars.find((car) => car.id === id);
  }

  async findAvailable({
    name,
    brand,
    category_id,
  }: IListCarDTO): Promise<Car[]> {
    return this.cars.filter((car) => {
      if (car.available === true && !name && !category_id && !brand) {
        return car;
      }

      if (
        (car.available === true && car.brand === brand) ||
        (car.available === true && car.category_id === category_id) ||
        (car.available === true && car.name === name)
      ) {
        return car;
      }

      return false;
    });
  }

  async findByLicensePlate(licensePlate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === licensePlate);
  }

  async create(data: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      ...data,
    });

    this.cars.push(car);

    return car;
  }
}
