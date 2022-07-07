import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
  Unique,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { Category } from './Category';
import { Specification } from './Specification';

@Entity('car')
export class Car {
  @PrimaryColumn()
  public id?: string;

  @Column()
  public name: string;

  @Column()
  public description: string;

  @Column()
  public daily_rate: number;

  @Column()
  public available: boolean;

  @Column()
  public license_plate: string;

  @Column()
  public fine_amount: number;

  @Column()
  public brand: string;

  @Column()
  public category_id: string;

  @CreateDateColumn()
  public created_at: Date;

  @ManyToOne(() => Category, (categories) => categories.id)
  @JoinColumn({ name: 'category_id' })
  public category: Category;

  @ManyToMany(() => Specification, { cascade: true })
  @JoinTable({
    name: 'specification_car',
    joinColumn: { name: 'car_id' },
    inverseJoinColumn: { name: 'specification_id' },
  })
  public specifications: Specification[];

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
      this.available = true;
    }
  }
}
