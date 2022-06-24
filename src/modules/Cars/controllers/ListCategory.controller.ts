import { Request, Response } from 'express';

import { ListCategoryService } from '../services/ListCategory.service';

export class ListCategoryController {
  constructor(private readonly listCategoryService: ListCategoryService) {}

  handle(request: Request, response: Response): Response {
    const categories = this.listCategoryService.execute();

    return response.json(categories);
  }
}
