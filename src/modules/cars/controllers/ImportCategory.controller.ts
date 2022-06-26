import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ImportCategoryService } from '../services/ImportCategory.service';

export class ImportCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;
    const importCategoryService = container.resolve(ImportCategoryService);

    await importCategoryService.execute(file);

    return response.status(201).send();
  }
}
