import { ISpecificationRepository } from '../repositories/interfaces/ISpecificationRepository';

interface IRequest {
  name: string;
  description: string;
}

export class CreateSpecificationService {
  constructor(
    private readonly specificationRepository: ISpecificationRepository
  ) {}

  execute({ name, description }: IRequest): void {
    const specificationExists = this.specificationRepository.findByName(name);

    if (specificationExists) {
      throw new Error('Specification already exists!');
    }
    this.specificationRepository.create({ name, description });
  }
}
