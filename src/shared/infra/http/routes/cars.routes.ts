import { Router } from 'express';
import multer from 'multer';

import Upload from '../../../../config/upload';
import { CreateCarController } from '../../../../modules/cars/controllers/CreateCar.controller';
import { ListAvailableCarController } from '../../../../modules/cars/controllers/ListAvailableCar.controller';
import { UploadCarImageController } from '../../../../modules/cars/controllers/UploadCarImage.controller';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuth } from '../middlewares/ensureAuth';

const carsRoutes = Router();

const uploadCarImage = multer(Upload('./tmp/cars'));

const createCarConstroller = new CreateCarController();
const listCarConstroller = new ListAvailableCarController();
const uploadCarImageController = new UploadCarImageController();

carsRoutes.post('/', ensureAuth, ensureAdmin, createCarConstroller.handle);

carsRoutes.get('/available', listCarConstroller.handle);

carsRoutes.post(
  '/images/:id',
  ensureAuth,
  ensureAdmin,
  uploadCarImage.array('images'),
  uploadCarImageController.handle
);

export { carsRoutes };
