import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async findAllByUserId(userId: number): Promise<Book[]> {
    return this.bookRepository.find({
      where: { userId: userId },
      order: { addedAt: 'DESC' }, 
    });
  }

  async create(userId: number, createBookDto: CreateBookDto): Promise<Book> {
    const newBook = this.bookRepository.create({
      ...createBookDto,
      userId: userId,
    });
    return this.bookRepository.save(newBook);
  }
}