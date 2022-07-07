import { Car } from '../../modules/cars/infra/typeorm/entities/Car';
import { CarRepositoryInMemory } from '../../modules/cars/repositories/inmemory/Car.repository.inmemory';
import { SpecificationRepositoryInMemory } from '../../modules/cars/repositories/inmemory/Specification.repository.inmemory';
import { CreateCarService } from '../../modules/cars/services/CreateCar.service';
import { AppError } from '../../shared/errors/AppError';

let createCarService: CreateCarService;
let carRepository: CarRepositoryInMemory;
let specificationRepository: SpecificationRepositoryInMemory;

describe('-- Create Car --', () => {
  beforeEach(() => {
    specificationRepository = new SpecificationRepositoryInMemory();
    carRepository = new CarRepositoryInMemory();
    createCarService = new CreateCarService(
      carRepository,
      specificationRepository
    );
  });

  test('should be able to create a new car', async () => {
    const car = await createCarService.execute({
      brand: 'brand',
      category_id: 'id',
      daily_rate: 100,
      description: 'blablabla',
      fine_amount: 60,
      license_plate: 'aloalo',
      name: 'UNO',
    });

    expect(car).toBeInstanceOf(Car);
    expect(car).toHaveProperty('id');
  });

  test('should not be able to create a new car when license plate already exists', () => {
    expect(async () => {
      await createCarService.execute({
        brand: 'brand',
        category_id: 'id',
        daily_rate: 100,
        description: 'blablabla',
        fine_amount: 60,
        license_plate: 'aloalo',
        name: 'UNO1',
      });

      await createCarService.execute({
        brand: 'brand',
        category_id: 'id',
        daily_rate: 100,
        description: 'blablabla',
        fine_amount: 60,
        license_plate: 'aloalo',
        name: 'UNO2',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  test('should be able to create a new available car', async () => {
    const car = await createCarService.execute({
      brand: 'brand',
      category_id: 'id',
      daily_rate: 100,
      description: 'blablabla',
      fine_amount: 60,
      license_plate: 'aloalo',
      name: 'UNO1',
    });

    expect(car.available).toBeTruthy();
  });

  test('should be able to create car with specifications', async () => {
    await specificationRepository.create({
      name: 'Spec Test',
      description: 'Spec description',
    });

    await specificationRepository.create({
      name: 'Spec Test2',
      description: 'Spec description2',
    });

    const specifications = await specificationRepository.findAll();
    const specIds = specifications.map((spec) => spec.id);

    const car = await createCarService.execute({
      brand: 'brand',
      category_id: 'id',
      daily_rate: 100,
      description: 'blablabla',
      fine_amount: 60,
      license_plate: 'aloalo',
      name: 'UNO1',
      specifications: specIds,
    });

    expect(car).toBeInstanceOf(Car);
    expect(car).toHaveProperty('id');
  });
});
