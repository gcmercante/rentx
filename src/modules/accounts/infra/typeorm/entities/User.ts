import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('user')
export class User {
  @PrimaryColumn()
  public id?: string;

  @Column()
  public name: string;

  @Column({ unique: true })
  public email: string;

  @Column()
  public password: string;

  @Column()
  public driver_license: string;

  @Column()
  public is_admin?: boolean;

  @CreateDateColumn()
  public created_at: Date;

  @Column({ nullable: true })
  public avatar_url: string;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
      this.is_admin = false;
    }
  }
}
