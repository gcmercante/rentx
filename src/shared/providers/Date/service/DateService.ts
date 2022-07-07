import { IDate } from '../interfaces/IDate';

export class DateService {
  constructor(private readonly date: IDate) {}

  daysDiff(firstDate: Date, secondDate: Date): number {
    return this.date.daysDiff(firstDate, secondDate);
  }

  addDays(date: Date, daysToAdd: number): Date {
    return this.date.addDays(date, daysToAdd);
  }
}
