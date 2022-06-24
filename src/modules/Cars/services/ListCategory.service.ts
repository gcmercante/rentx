import { Category } from '../model/Category';
import { ICategoryRepository } from '../repositories/interfaces/ICategoryRepository';

export class ListCategoryService {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  execute(): Category[] {
    return this.categoryRepository.list();
  }
}
