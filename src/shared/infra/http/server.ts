import { AppDataSource } from '../database';
import { app } from './app';

AppDataSource.initialize()
  .then(() => {
    app.listen(3333, () => console.log('Server is running'));
  })
  .catch((error) => console.log(error));
