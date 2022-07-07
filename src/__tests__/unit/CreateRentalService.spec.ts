import { RentalRepositoryInMemory } from '../../modules/rentals/repositories/inmemory/Rental.repository.inmemory';
import { CreateRentalService } from '../../modules/rentals/services/CreateRental.service';
import { AppError } from '../../shared/errors/AppError';
import { date } from '../../shared/providers/Date';

let createRentalService: CreateRentalService;
let rentalRepository: RentalRepositoryInMemory;

describe('-- Create Rental Service --', () => {
  beforeEach(() => {
    rentalRepository = new RentalRepositoryInMemory();
    createRentalService = new CreateRentalService(rentalRepository);
  });

  test('should be able to create a new rental', async () => {
    const rental = await createRentalService.execute({
      user_id: '1234',
      car_id: '1212',
      expected_return_date: date.addDays(new Date(), 1),
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('departure_date');
  });

  test('should not be able to create a new rental when user already has an open rental', async () => {
    expect(async () => {
      await createRentalService.execute({
        user_id: '1234',
        car_id: '1212',
        expected_return_date: date.addDays(new Date(), 1),
      });

      await createRentalService.execute({
        user_id: '1234',
        car_id: '1213',
        expected_return_date: date.addDays(new Date(), 1),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  test('should not be able to create a new rental when car is already rented', async () => {
    expect(async () => {
      await createRentalService.execute({
        user_id: '1234',
        car_id: '1212',
        expected_return_date: date.addDays(new Date(), 1),
      });

      await createRentalService.execute({
        user_id: '1235',
        car_id: '1212',
        expected_return_date: date.addDays(new Date(), 1),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  test('should not be able to create a new rental when expected return date is below 24h', async () => {
    expect(async () => {
      await createRentalService.execute({
        user_id: '1234',
        car_id: '1212',
        expected_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
