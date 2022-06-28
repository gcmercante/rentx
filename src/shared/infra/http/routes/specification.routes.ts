import { Router } from 'express';

import { CreateSpecificationController } from '../../../../modules/cars/controllers/CreateSpecification.controller';

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationRoutes.post('/', createSpecificationController.handle);

export { specificationRoutes };
