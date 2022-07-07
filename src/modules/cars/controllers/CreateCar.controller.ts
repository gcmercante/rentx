import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCarService } from '../services/CreateCar.service';

export class CreateCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createCarService = container.resolve(CreateCarService);

    const car = await createCarService.execute(request.body);

    return response.status(201).json(car);
  }
}
