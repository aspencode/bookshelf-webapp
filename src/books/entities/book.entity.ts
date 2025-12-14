import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  Check,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { BookFormat } from '../enums/book-format.enum';

@Entity('books')
@Check(`"rating" >= 0 AND "rating" <= 20`)
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.books, { onDelete: 'CASCADE' })
  user: User; 

  @Column()
  title: string;

  @Column()
  author: string;

  @Column({ nullable: true })
  isbn: string;

  @Column({
    type: 'enum',
    enum: BookFormat,
    default: BookFormat.OTHER,
  })
  format: BookFormat;

  @Column({ nullable: true })
  length: number; // pages or minutes

  @Column({ nullable: true })
  coverUrl: string;

  @Column({ type: 'smallint', nullable: true })
  rating: number;

  @Column({ type: 'text', nullable: true })
  reviewText: string;

  @Column({ nullable: true })
  bookmarkPosition: number;

  @Column({ type: 'date', nullable: true })
  startedAt: Date;

  @Column({ type: 'date', nullable: true })
  finishedAt: Date;

  @Column({ type: 'date', nullable: true })
  lastReadAt: Date;

  @CreateDateColumn()
  addedAt: Date;
}
