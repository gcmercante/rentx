import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'q1w2e3',
  database: 'rentx',
  synchronize: false,
  logging: false,
  migrations: [`${__dirname}/migrations/*.ts`],
  entities: [
    `${__dirname}/../../../modules/cars/infra/typeorm/entities/*.ts`,
    `${__dirname}/../../../modules/accounts/infra/typeorm/entities/*.ts`,
  ],
});
