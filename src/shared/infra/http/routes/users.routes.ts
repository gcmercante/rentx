import { Router } from 'express';
import multer from 'multer';

import Upload from '../../../../config/upload';
import { CreateUserController } from '../../../../modules/accounts/controllers/CreateUser.controller';
import { UpsertUserAvatarController } from '../../../../modules/accounts/controllers/UpsertUserAvatar.controller';
import { ensureAuth } from '../middlewares/ensureAuth';

const usersRoutes = Router();

const uploadAvatar = multer(Upload('./tmp/avatar'));

const createUserController = new CreateUserController();
const upsertUserAvatarController = new UpsertUserAvatarController();

usersRoutes.post('/', createUserController.handle);

usersRoutes.patch(
  '/avatar',
  ensureAuth,
  uploadAvatar.single('avatar'),
  upsertUserAvatarController.handle
);

export { usersRoutes };
