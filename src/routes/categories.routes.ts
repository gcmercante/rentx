import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '../modules/cars/controllers/CreateCategory.controller';
import { ImportCategoryController } from '../modules/cars/controllers/ImportCategory.controller';
import { ListCategoryController } from '../modules/cars/controllers/ListCategory.controller';

const categoriesRoutes = Router();

const upload = multer({
  dest: './tmp',
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoryController = new ListCategoryController();

categoriesRoutes.post('/', createCategoryController.handle);

categoriesRoutes.get('/', listCategoryController.handle);

categoriesRoutes.post(
  '/import',
  upload.single('file'),
  importCategoryController.handle
);

export { categoriesRoutes };
