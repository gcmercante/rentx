import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateRentalService } from '../services/CreateRental.service';

export class CreateRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { expected_return_date, car_id } = request.body;
    const { id } = request.user;

    const createRentalService = container.resolve(CreateRentalService);

    const rental = await createRentalService.execute({
      expected_return_date,
      car_id,
      user_id: id,
    });

    return response.status(201).json(rental);
  }
}
