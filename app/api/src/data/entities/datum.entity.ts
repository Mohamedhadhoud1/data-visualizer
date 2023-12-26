import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Data {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ name: 'foldernumber' })
  folderNumber: string;
  @Column()
  seller: string;
  @Column()
  name: string;
  @Column()
  mail: string;
  @Column({ name: 'salesamount' })
  salesAmount: string;
  @Column()
  course: string;
  @Column({ name: 'datestartcourse' })
  dateStartCourse: string;
  @Column({ name: 'dateendcourse' })
  dateEndCourse: string;
  @Column({ name: 'courseacivated' })
  courseAcivated: string;
  @Column({ name: 'courselink' })
  courseLink: string;
  // @Column({ name: 'coursecode' })
  // courseCode: string;
}
