import { Router } from 'express';

import { CreateRentalController } from '../../../../modules/rentals/controllers/CreateRental.controller';
import { ensureAuth } from '../middlewares/ensureAuth';

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();

rentalRoutes.post('/', ensureAuth, createRentalController.handle);

export { rentalRoutes };
