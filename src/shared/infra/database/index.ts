import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'q1w2e3',
  database: process.env.NODE_ENV === 'test' ? 'rentx_test' : 'rentx',
  schema: 'rentx',
  synchronize: false,
  logging: false,
  migrations: [`${__dirname}/migrations/*.ts`],
  entities: [
    `${__dirname}/../../../modules/cars/infra/typeorm/entities/*.ts`,
    `${__dirname}/../../../modules/accounts/infra/typeorm/entities/*.ts`,
    `${__dirname}/../../../modules/rentals/infra/typeorm/entities/*.ts`,
  ],
});
