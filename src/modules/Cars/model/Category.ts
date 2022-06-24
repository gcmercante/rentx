import { v4 as uuidV4 } from 'uuid';

export class Category {
  public id?: string;
  public name: string;
  public description: string;
  public createdAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
