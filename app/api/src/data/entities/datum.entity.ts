import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Data {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  folderNumber: string;
  @Column({ unique: true })
  seller: string;
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
