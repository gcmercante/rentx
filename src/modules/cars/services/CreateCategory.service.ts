import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../errors/AppError';
import { ICategoryRepository } from '../repositories/interfaces/ICategoryRepository';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateCategoryService {
  constructor(
    @inject('CategoryRepository')
    private readonly categoriesRepository: ICategoryRepository
  ) {}
  async execute({ name, description }: IRequest): Promise<void> {
    const categoryExists = await this.categoriesRepository.findByName(name);

    if (categoryExists) {
      throw new AppError('Category already exists!');
    }

    this.categoriesRepository.create({ name, description });
  }
}
