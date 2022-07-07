export interface IDate {
  daysDiff(firstDate: Date, secondDate: Date): number;
  addDays(date: Date, daysToAdd: number): Date;
}
