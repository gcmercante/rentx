import { v4 as uuidV4 } from 'uuid';
import { hash } from 'bcrypt';

import { AppDataSource } from '..';

async function create() {
  const id = uuidV4();
  const password = await hash('q1w2e3', 8);

  await AppDataSource.initialize();
  const query = `INSERT INTO rentx.user (id, name, email, password, is_admin, created_at, driver_license) VALUES ('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'ABCDEFG')`;

  await AppDataSource.query(query);

  await AppDataSource.destroy();
}

create().then(() => {
  console.log('Admin created');
  process.exit(0);
});
