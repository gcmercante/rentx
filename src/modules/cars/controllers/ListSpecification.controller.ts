import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListSpecificationService } from '../services/ListSpecification.service';

export class ListSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listSpecService = container.resolve(ListSpecificationService);

    const specs = await listSpecService.execute();

    return response.json(specs);
  }
}
