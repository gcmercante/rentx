import { parse } from 'csv-parse';
import fs from 'fs';

import { ICategoryRepository } from '../repositories/interfaces/ICategoryRepository';

interface IImportCategory {
  name: string;
  description: string;
}

export class ImportCategoryService {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  loadCategory(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: IImportCategory[] = [];

      const parseFile = parse();

      stream.pipe(parseFile);

      parseFile
        .on('data', async (line) => {
          const [name, description] = line;

          categories.push({ name, description });
        })
        .on('end', () => {
          fs.promises.unlink(file.path);
          return resolve(categories);
        })
        .on('error', (error) => {
          return reject(error);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategory(file);

    categories.forEach((category) => {
      const { name, description } = category;

      const categoryExists = this.categoryRepository.findByName(name);

      if (!categoryExists) {
        this.categoryRepository.create({ name, description });
      }
    });
  }
}
