import { In, Repository } from 'typeorm';

import { AppDataSource } from '../../../../../shared/infra/database';
import { ICreateSpecificationDTO } from '../../../dtos/ICreateSpecification';
import { ISpecificationRepository } from '../../../repositories/interfaces/ISpecificationRepository';
import { Specification } from '../entities/Specification';

export class SpecificationRepository implements ISpecificationRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = AppDataSource.getRepository(Specification);
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    return this.repository.find({ where: { id: In(ids) } });
  }

  async create({ description, name }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({ name, description });

    await this.repository.save(specification);
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({ where: { name } });

    return specification;
  }

  async findAll(): Promise<Specification[]> {
    return this.repository.find();
  }
}
