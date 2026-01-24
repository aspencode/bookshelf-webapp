import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

async findAllByUserId(userId: number, page: number = 1, limit: number = 10) {
  const skip = (page - 1) * limit;

  const [data, total] = await this.bookRepository.findAndCount({
    where: { userId: userId },
    order: { addedAt: 'DESC' },
    take: limit, 
    skip: skip,    
  });

  return {
    data,
    meta: {
      totalItems: total,
      itemCount: data.length,
      itemsPerPage: limit,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    },
  };
}

async findOne(id: number): Promise<Book> {
  const book = await this.bookRepository.findOne({
    where: { id: id },
  });

  if (!book) {
    throw new NotFoundException(`Book with ID ${id} not found`);
  }

  return book;
}

  async create(userId: number, createBookDto: CreateBookDto): Promise<Book> {
    const newBook = this.bookRepository.create({
      ...createBookDto,
      userId: userId,
    });
    return this.bookRepository.save(newBook);
  }

    async update(userId: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const newBook = this.bookRepository.create({
      ...updateBookDto,
      userId: userId,
    });
    return this.bookRepository.save(newBook);
  }

  async remove(userId: number, bookId: number): Promise<void> {
  const book = await this.bookRepository.findOne({
    where: { id: bookId, userId: userId },
  });

  if (!book) {
    throw new Error('Book not found or you do not have permission to delete this book');
  }

  await this.bookRepository.remove(book);
}

}