import { Request, Response } from 'express';

import { CreateCategoryService } from '../services/CreateCategory.service';

export class CreateCategoryController {
  constructor(private readonly createCategoryService: CreateCategoryService) {}

  handle(request: Request, response: Response): Response {
    try {
      const { name, description } = request.body;

      this.createCategoryService.execute({ name, description });

      return response.status(201).send();
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
