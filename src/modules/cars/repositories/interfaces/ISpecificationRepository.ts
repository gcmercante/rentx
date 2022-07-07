import { ICreateSpecificationDTO } from '../../dtos/ICreateSpecification';
import { Specification } from '../../infra/typeorm/entities/Specification';

export interface ISpecificationRepository {
  create(props: ICreateSpecificationDTO): Promise<void>;
  findByName(name: string): Promise<Specification>;
  findAll(): Promise<Specification[]>;
  findByIds(ids: string[]): Promise<Specification[]>;
}
