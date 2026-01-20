import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BookFormat } from '../enums/book-format.enum';

export class CreateBookDto {
  @ApiProperty({ example: 'The Witcher: The Last Wish', description: 'Book title' })
  title: string;

  @ApiProperty({ example: 'Andrzej Sapkowski', description: 'Book author' })
  author: string;

  @ApiPropertyOptional({ example: '9780316438964', description: 'ISBN number' })
  isbn?: string;

  @ApiProperty({ 
    enum: BookFormat, 
    example: BookFormat.PHYSICAL, 
    description: 'Format: 0=Other, 1=Physical, 2=Ebook, 3=Audiobook' 
  })
  format: BookFormat;

  @ApiPropertyOptional({ example: 344, description: 'page amount / minutes' })
  length?: number;

  @ApiPropertyOptional({ example: 'https://cdn.thestorygraph.com/5brpbfo7dnvo7ubq2dgvpsxpyuiq', description: 'Link to cover image' })
  coverUrl?: string;

  @ApiPropertyOptional({ 
    minimum: 0, 
    maximum: 20, 
    example: 18, 
    description: 'Rating (0-20, where 20 is 5 stars)' 
  })
  rating?: number;

  @ApiPropertyOptional({ example: 'Great book!', description: 'Review text' })
  reviewText?: string;

  @ApiPropertyOptional({ example: 344, description: 'Bookmark position (page number or minutes)' })
  bookmarkPosition?: number;

  @ApiPropertyOptional({ example: '2023-01-15', description: 'Start date (YYYY-MM-DD)' })
  startedAt?: Date;
  
  @ApiPropertyOptional({ example: '2024-02-10', description: 'Finish date (YYYY-MM-DD)' })
  finishedAt?: Date;

  @ApiPropertyOptional({ example: '2024-02-10', description: 'Last read date (YYYY-MM-DD)' })
  lastReadAt?: Date;

}