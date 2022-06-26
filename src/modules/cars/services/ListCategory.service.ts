import { inject, injectable } from 'tsyringe';

import { Category } from '../entities/Category';
import { ICategoryRepository } from '../repositories/interfaces/ICategoryRepository';

@injectable()
export class ListCategoryService {
  constructor(
    @inject('CategoryRepository')
    private readonly categoryRepository: ICategoryRepository
  ) {}

  async execute(): Promise<Category[]> {
    return this.categoryRepository.list();
  }
}
