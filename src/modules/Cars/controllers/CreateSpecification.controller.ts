import { Request, Response } from 'express';

import { CreateSpecificationService } from '../services/CreateSpecification.service';

export class CreateSpecificationController {
  constructor(
    private readonly createSpecificationService: CreateSpecificationService
  ) {}

  handle(request: Request, response: Response): Response {
    try {
      const { name, description } = request.body;

      this.createSpecificationService.execute({ name, description });

      return response.status(201).send();
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
