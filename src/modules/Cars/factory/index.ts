import { CreateCategoryController } from '../controllers/CreateCategory.controller';
import { CreateSpecificationController } from '../controllers/CreateSpecification.controller';
import { ImportCategoryController } from '../controllers/ImportCategory.controller';
import { ListCategoryController } from '../controllers/ListCategory.controller';
import { CategoryRepository } from '../repositories/Category.repository';
import { SpecificationRepository } from '../repositories/Specification.repository';
import { CreateCategoryService } from '../services/CreateCategory.service';
import { CreateSpecificationService } from '../services/CreateSpecification.service';
import { ImportCategoryService } from '../services/ImportCategory.service';
import { ListCategoryService } from '../services/ListCategory.service';

const categoryRepository = CategoryRepository.instance;

const createCategoryService = new CreateCategoryService(categoryRepository);

const createCategoryController = new CreateCategoryController(
  createCategoryService
);

const listCategoryService = new ListCategoryService(categoryRepository);

const listCategoryController = new ListCategoryController(listCategoryService);

const importCategoryService = new ImportCategoryService(categoryRepository);

const importCategoryController = new ImportCategoryController(
  importCategoryService
);

const specificationRepository = SpecificationRepository.instance;

const createSpecificationService = new CreateSpecificationService(
  specificationRepository
);

const createSpecificationController = new CreateSpecificationController(
  createSpecificationService
);

export {
  createCategoryController,
  listCategoryController,
  createSpecificationController,
  importCategoryController,
};
