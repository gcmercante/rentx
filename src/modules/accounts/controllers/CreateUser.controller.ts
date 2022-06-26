import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserService } from '../services/CreateUser.service';

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, password, email, driver_license } = request.body;

    const createUserService = container.resolve(CreateUserService);

    await createUserService.execute({
      name,
      password,
      email,
      driver_license,
    });

    return response.status(201).send();
  }
}
