import { inject, injectable } from 'tsyringe';

import { Specification } from '../infra/typeorm/entities/Specification';
import { ISpecificationRepository } from '../repositories/interfaces/ISpecificationRepository';

@injectable()
export class ListSpecificationService {
  constructor(
    @inject('SpecificationRepository')
    private readonly specRepository: ISpecificationRepository
  ) {}

  async execute(): Promise<Specification[]> {
    return this.specRepository.findAll();
  }
}
