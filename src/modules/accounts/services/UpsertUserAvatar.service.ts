import { inject, injectable } from 'tsyringe';

import { deletefile } from '../../../utils/file';
import { IUserRepository } from '../repositories/interfaces/IUserRepository';

interface IAvatarRequest {
  user_id: string;
  avatar_url: string;
}

@injectable()
export class UpsertUserAvatarService {
  constructor(
    @inject('UserRepository')
    private readonly userRepository: IUserRepository
  ) {}
  async execute({ user_id, avatar_url }: IAvatarRequest): Promise<void> {
    const user = await this.userRepository.findById(user_id);

    if (user.avatar_url) {
      await deletefile(`./tmp/avatar/${user.avatar_url}`);
    }

    user.avatar_url = avatar_url;

    await this.userRepository.create(user);
  }
}
