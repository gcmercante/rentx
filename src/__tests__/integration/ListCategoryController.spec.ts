import { hash } from 'bcrypt';
import request from 'supertest';
import { v4 as uuidV4 } from 'uuid';

import { AppDataSource } from '../../shared/infra/database';
import { app } from '../../shared/infra/http/app';

describe('-- List Category Controller --', () => {
  beforeAll(async () => {
    const id = uuidV4();
    const password = await hash('q1w2e3', 8);

    await AppDataSource.initialize();

    await AppDataSource.runMigrations();

    await AppDataSource.query(
      `INSERT INTO rentx.user (id, name, email, password, is_admin, created_at, driver_license) 
            VALUES ('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'ABCDEFG')`
    );
  });

  afterAll(async () => {
    await AppDataSource.dropDatabase();
    await AppDataSource.destroy();
  });

  test('should be able to list categories', async () => {
    const response = await request(app).get('/categories');

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(0);
  });

  test('should be able to list all inserted categories', async () => {
    const auth = await request(app).post('/sessions').send({
      email: 'admin@rentx.com.br',
      password: 'q1w2e3',
    });

    const { token } = auth.body;

    await request(app)
      .post('/categories')
      .send({
        name: 'Test Category',
        description: 'Test description',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const response = await request(app).get('/categories');

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(1);
  });
});
