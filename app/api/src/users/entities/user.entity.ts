import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ name: 'firstname' })
  firstName: string;
  @Column({ name: 'lastname' })
  lastName: string;
  @Column({ name: 'username' })
  userName: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
  @Column({ default: 'user', nullable: true })
  role: string;
}
