import { Car } from '../../modules/cars/infra/typeorm/entities/Car';
import { CarRepositoryInMemory } from '../../modules/cars/repositories/inmemory/Car.repository.inmemory';
import { ListAvailableCarService } from '../../modules/cars/services/ListAvailableCar.service';

let listCarService: ListAvailableCarService;
let carRepositoryInMemory: CarRepositoryInMemory;

describe('-- List Car --', () => {
  beforeEach(() => {
    carRepositoryInMemory = new CarRepositoryInMemory();
    listCarService = new ListAvailableCarService(carRepositoryInMemory);
  });

  test('should be able to list all available cars', async () => {
    const car = await carRepositoryInMemory.create({
      name: 'Car name',
      description: 'Car description',
      daily_rate: 0,
      license_plate: 'Car plate',
      fine_amount: 0,
      brand: 'Car brand',
      category_id: 'category_id',
    });

    const cars = await listCarService.execute({});

    expect(cars).toContainEqual<Car>(car);
    expect(cars).toHaveLength(1);
  });

  test('should be able to list all available cars by name', async () => {
    const car = await carRepositoryInMemory.create({
      name: 'Car name',
      description: 'Car description',
      daily_rate: 0,
      license_plate: 'Car plate',
      fine_amount: 0,
      brand: 'Car brand',
      category_id: 'category_id',
    });

    const car2 = await carRepositoryInMemory.create({
      name: 'Car name2',
      description: 'Car description',
      daily_rate: 0,
      license_plate: 'Car plate',
      fine_amount: 0,
      brand: 'Car brand',
      category_id: 'category_id',
    });

    const cars = await listCarService.execute({ name: 'Car name' });

    expect(cars).toContain<Car>(car);
    expect(cars).not.toContain(car2);
    expect(cars).toHaveLength(1);
  });

  test('should be able to list all available cars by brand', async () => {
    const car = await carRepositoryInMemory.create({
      name: 'Car name',
      description: 'Car description',
      daily_rate: 0,
      license_plate: 'Car plate',
      fine_amount: 0,
      brand: 'Car brand',
      category_id: 'category_id',
    });

    const car2 = await carRepositoryInMemory.create({
      name: 'Car name2',
      description: 'Car description',
      daily_rate: 0,
      license_plate: 'Car plate',
      fine_amount: 0,
      brand: 'Car brand2',
      category_id: 'category_id',
    });

    const cars = await listCarService.execute({ brand: 'Car brand' });

    expect(cars).toContain<Car>(car);
    expect(cars).not.toContain(car2);
    expect(cars).toHaveLength(1);
  });

  test('should be able to list all available cars by category_id', async () => {
    const car = await carRepositoryInMemory.create({
      name: 'Car name',
      description: 'Car description',
      daily_rate: 0,
      license_plate: 'Car plate',
      fine_amount: 0,
      brand: 'Car brand',
      category_id: 'category_id',
    });

    const car2 = await carRepositoryInMemory.create({
      name: 'Car name2',
      description: 'Car description',
      daily_rate: 0,
      license_plate: 'Car plate',
      fine_amount: 0,
      brand: 'Car brand2',
      category_id: 'category_id2',
    });

    const cars = await listCarService.execute({ category_id: 'category_id' });

    expect(cars).toContain<Car>(car);
    expect(cars).not.toContain(car2);
    expect(cars).toHaveLength(1);
  });
});
