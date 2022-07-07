import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { User } from '../../../../accounts/infra/typeorm/entities/User';
import { Car } from '../../../../cars/infra/typeorm/entities/Car';

@Entity('rental')
export class Rental {
  @PrimaryColumn()
  public id?: string;

  @Column()
  public car_id: string;

  @Column()
  public user_id: string;

  @CreateDateColumn()
  public departure_date: Date;

  @Column({ nullable: true })
  public return_date: Date;

  @Column()
  public expected_return_date: Date;

  @Column({ nullable: true })
  public total_value: number;

  @CreateDateColumn()
  public created_at: Date;

  @CreateDateColumn()
  public updated_at: Date;

  @ManyToOne(() => Car, (car) => car.id)
  @JoinColumn({ name: 'car_id' })
  public car: Car;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  public user: User;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
