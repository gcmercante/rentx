import { Specification } from '../../modules/cars/infra/typeorm/entities/Specification';
import { SpecificationRepositoryInMemory } from '../../modules/cars/repositories/inmemory/Specification.repository.inmemory';
import { ListSpecificationService } from '../../modules/cars/services/ListSpecification.service';

let specRepository: SpecificationRepositoryInMemory;
let listSpecService: ListSpecificationService;

describe('-- List Specification Service --', () => {
  beforeAll(async () => {
    specRepository = new SpecificationRepositoryInMemory();

    listSpecService = new ListSpecificationService(specRepository);
  });

  test('should be able to list all specs', async () => {
    await specRepository.create({
      name: 'Spec name',
      description: 'Spec description',
    });

    await specRepository.create({
      name: 'Spec name2',
      description: 'Spec description',
    });

    const specs = await listSpecService.execute();

    expect(specs).toHaveLength(2);
    expect(specs[0]).toBeInstanceOf(Specification);
  });
});
