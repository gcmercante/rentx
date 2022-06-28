import { Specification } from '../../infra/typeorm/entities/Specification';

export interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

export interface ISpecificationRepository {
  create(props: ICreateSpecificationDTO): Promise<void>;
  findByName(name: string): Promise<Specification>;
}
