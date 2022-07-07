import { Router } from 'express';

import { CreateSpecificationController } from '../../../../modules/cars/controllers/CreateSpecification.controller';
import { ListSpecificationController } from '../../../../modules/cars/controllers/ListSpecification.controller';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuth } from '../middlewares/ensureAuth';

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationController = new ListSpecificationController();

specificationRoutes.post(
  '/',
  ensureAuth,
  ensureAdmin,
  createSpecificationController.handle
);
specificationRoutes.get('/', listSpecificationController.handle);

export { specificationRoutes };
