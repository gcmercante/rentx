import { DateFns as Adapter } from './adapters';
import { DateService } from './service/DateService';

export const date = new DateService(new Adapter());
