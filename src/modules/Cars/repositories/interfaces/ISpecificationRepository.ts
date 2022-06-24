import { Specification } from '../model/Specification';

export interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

export interface ISpecificationRepository {
  create(props: ICreateSpecificationDTO): void;
  findByName(name: string): Specification;
}
