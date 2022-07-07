import { ICreateSpecificationDTO } from '../../dtos/ICreateSpecification';
import { Specification } from '../../infra/typeorm/entities/Specification';
import { ISpecificationRepository } from '../interfaces/ISpecificationRepository';

export class SpecificationRepositoryInMemory
  implements ISpecificationRepository
{
  private specifications: Specification[] = [];

  async findByIds(ids: string[]): Promise<Specification[]> {
    return this.specifications.filter((spec) => ids.includes(spec.id));
  }

  async create(props: ICreateSpecificationDTO): Promise<void> {
    const specification = new Specification();

    Object.assign(specification, props);

    this.specifications.push(specification);
  }

  async findByName(name: string): Promise<Specification> {
    return this.specifications.find((spec) => spec.name === name);
  }

  async findAll(): Promise<Specification[]> {
    return this.specifications;
  }
}
