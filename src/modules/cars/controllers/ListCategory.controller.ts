import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListCategoryService } from '../services/ListCategory.service';

export class ListCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listCategoryService = container.resolve(ListCategoryService);

    const categories = await listCategoryService.execute();

    return response.json(categories);
  }
}
