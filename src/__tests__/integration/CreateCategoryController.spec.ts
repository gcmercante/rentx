import { hash } from 'bcrypt';
import request from 'supertest';
import { v4 as uuidV4 } from 'uuid';

import { AppDataSource } from '../../shared/infra/database';
import { app } from '../../shared/infra/http/app';

describe('-- Create Category Controller --', () => {
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

  test('should be able to create a new category', async () => {
    const auth = await request(app).post('/sessions').send({
      email: 'admin@rentx.com.br',
      password: 'q1w2e3',
    });

    const { token } = auth.body;

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Test Category',
        description: 'Test description',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.statusCode).toBe(201);
  });

  test('should not be able to create a new category with same name', async () => {
    const auth = await request(app).post('/sessions').send({
      email: 'admin@rentx.com.br',
      password: 'q1w2e3',
    });

    const { token } = auth.body;

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Test Category',
        description: 'Test description',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.statusCode).toBe(400);
  });

  test('should not be able to create a new category without auth token', async () => {
    const response = await request(app).post('/categories').send({
      name: 'Test Category',
      description: 'Test description',
    });

    expect(response.statusCode).toBe(401);
  });
});
