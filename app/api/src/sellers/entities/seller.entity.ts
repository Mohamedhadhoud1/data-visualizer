import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Sellers {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  mainSellerName: string;
  @Column()
  mainSellerMail: string;
  @Column()
  subSellerName: string;
  @Column()
  subSellerMail: string;
  @Column()
  code: string;
}
