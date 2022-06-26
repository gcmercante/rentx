import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpsertUserAvatarService } from '../services/UpsertUserAvatar.service';

export class UpsertUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const avatarFile = request.file.filename;

    const upsertUserAvatarService = container.resolve(UpsertUserAvatarService);

    await upsertUserAvatarService.execute({
      user_id: id,
      avatar_url: avatarFile,
    });

    return response.status(204).send();
  }
}
