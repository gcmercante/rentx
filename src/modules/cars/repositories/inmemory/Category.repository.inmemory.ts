import { Category } from '../../infra/typeorm/entities/Category';
import {
  ICategoryRepository,
  ICreateCategoryDTO,
} from '../interfaces/ICategoryRepository';

export class CategoryRepositoryInMemory implements ICategoryRepository {
  private categories: Category[] = [];

  async findByName(name: string): Promise<Category> {
    const category = this.categories.find((category) => category.name === name);

    return category;
  }

  async list(): Promise<Category[]> {
    return this.categories;
  }

  async create(props: ICreateCategoryDTO): Promise<void> {
    const category = new Category();

    Object.assign(category, props);

    this.categories.push(category);
  }
}
