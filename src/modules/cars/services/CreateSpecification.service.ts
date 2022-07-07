import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../shared/errors/AppError';
import { ISpecificationRepository } from '../repositories/interfaces/ISpecificationRepository';

interface ICreateSpecificationRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateSpecificationService {
  constructor(
    @inject('SpecificationRepository')
    private readonly specificationRepository: ISpecificationRepository
  ) {}

  async execute({
    name,
    description,
  }: ICreateSpecificationRequest): Promise<void> {
    const specificationExists = await this.specificationRepository.findByName(
      name
    );

    if (specificationExists) {
      throw new AppError('Specification already exists!');
    }

    await this.specificationRepository.create({ name, description });
  }
}
