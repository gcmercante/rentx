import { CategoryRepositoryInMemory } from '../modules/cars/repositories/inmemory/Category.repository.inmemory';
import { CreateCategoryService } from '../modules/cars/services/CreateCategory.service';
import { AppError } from '../shared/errors/AppError';

let categoryRepositoryInMemory: CategoryRepositoryInMemory;
let createCategoryService: CreateCategoryService;

describe('-- Create Category --', () => {
  beforeEach(() => {
    categoryRepositoryInMemory = new CategoryRepositoryInMemory();
    createCategoryService = new CreateCategoryService(
      categoryRepositoryInMemory
    );
  });

  test('should be able to create a new category', async () => {
    const category = {
      name: 'Category test',
      description: 'This is a test',
    };

    await createCategoryService.execute(category);

    const createdCategory = await categoryRepositoryInMemory.findByName(
      category.name
    );

    expect(createdCategory).toHaveProperty('id');
  });

  test('should not create category when it already exists', async () => {
    expect(async () => {
      const category = {
        name: 'Category test',
        description: 'This is a test',
      };

      await createCategoryService.execute(category);

      await createCategoryService.execute(category);
    }).rejects.toBeInstanceOf(AppError);
  });
});
