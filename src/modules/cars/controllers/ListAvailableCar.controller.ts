import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListAvailableCarService } from '../services/ListAvailableCar.service';

export class ListAvailableCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, brand, category_id } = request.query;

    const listAvailableCarService = container.resolve(ListAvailableCarService);

    const cars = await listAvailableCarService.execute({
      name: name as string,
      brand: brand as string,
      category_id: category_id as string,
    });

    return response.json(cars);
  }
}
