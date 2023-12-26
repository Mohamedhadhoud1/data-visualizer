import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Sellers {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ name: 'mainsellername' })
  mainSellerName: string;
  @Column({ name: 'mainsellermail' })
  mainSellerMail: string;
  @Column({ name: 'subsellername' })
  subSellerName: string;
  @Column({ name: 'subsellermail' })
  subSellerMail: string;
  @Column()
  code: string;
}
