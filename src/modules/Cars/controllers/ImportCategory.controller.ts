import { Request, Response } from 'express';

import { ImportCategoryService } from '../services/ImportCategory.service';

export class ImportCategoryController {
  constructor(private readonly importCategoryService: ImportCategoryService) {}

  handle(request: Request, response: Response): Response {
    const { file } = request;
    this.importCategoryService.execute(file);
    return response.send();
  }
}
