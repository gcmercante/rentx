import { differenceInCalendarDays, addDays } from 'date-fns';

import { IDate } from '../interfaces/IDate';

export class DateFnsAdapter implements IDate {
  daysDiff(firstDate: Date, secondDate: Date): number {
    return differenceInCalendarDays(firstDate, secondDate);
  }

  addDays(date: Date, daysToAdd: number): Date {
    return addDays(date, daysToAdd);
  }
}
