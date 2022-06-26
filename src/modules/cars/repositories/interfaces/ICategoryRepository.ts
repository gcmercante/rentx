import { Category } from '../../entities/Category';

export interface ICreateCategoryDTO {
  name: string;
  description: string;
}

export interface ICategoryRepository {
  findByName(name: string): Promise<Category>;
  list(): Promise<Category[]>;
  create(props: ICreateCategoryDTO): Promise<void>;
}
