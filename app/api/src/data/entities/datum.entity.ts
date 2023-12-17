import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Data {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  folderNumber: string;
  @Column()
  seller: string;
  @Column()
  name: string;
  @Column()
  mail: string;
  @Column()
  salesAmount: string;
  @Column()
  course: string;
  @Column()
  dateStartCourse: string;
  @Column()
  dateEndCourse: string;
  @Column()
  courseAcivated: string;
  @Column()
  courseLink: string;
  @Column()
  courseCode: string;
}
