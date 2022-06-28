import { Repository } from 'typeorm';

import { AppDataSource } from '../../../../../shared/infra/database';
import {
  ISpecificationRepository,
  ICreateSpecificationDTO,
} from '../../../repositories/interfaces/ISpecificationRepository';
import { Specification } from '../entities/Specification';

export class SpecificationRepository implements ISpecificationRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = AppDataSource.getRepository(Specification);
  }

  async create({ description, name }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({ name, description });

    await this.repository.save(specification);
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({ where: { name } });

    return specification;
  }
}
