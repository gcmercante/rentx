import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthUserService } from '../services/AuthUser.service';

export class AuthUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authUserService = container.resolve(AuthUserService);

    const authInfo = await authUserService.execute({ email, password });

    return response.json(authInfo);
  }
}
