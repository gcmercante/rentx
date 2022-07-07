import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { Car } from './Car';

@Entity('car_image')
export class CarImage {
  @PrimaryColumn()
  public id?: string;

  @ManyToOne(() => Car, (car) => car.id)
  @JoinColumn({ name: 'car_id' })
  public car: Car;

  @Column()
  public car_id: string;

  @Column()
  public image_name: string;

  @CreateDateColumn()
  public created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
