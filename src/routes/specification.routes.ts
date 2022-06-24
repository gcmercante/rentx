import { Router } from 'express';

import { createSpecificationController } from '../modules/Cars/factory';

const specificationRoutes = Router();

specificationRoutes.post('/', (request, response) => {
  return createSpecificationController.handle(request, response);
});

export { specificationRoutes };
