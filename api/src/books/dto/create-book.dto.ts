import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BookFormat } from '../enums/book-format.enum';

export class CreateBookDto {
  @ApiProperty({ example: 'Wiedźmin: Ostatnie życzenie', description: 'Book title' })
  title: string;

  @ApiProperty({ example: 'Andrzej Sapkowski', description: 'Book author' })
  author: string;

  @ApiProperty({ 
    enum: BookFormat, 
    example: BookFormat.PHYSICAL, 
    description: 'Format: 0=Other, 1=Physical, 2=Ebook, 3=Audiobook' 
  })
  format: BookFormat;

  @ApiPropertyOptional({ example: 320, description: 'page amount / minutes' })
  length?: number;

  @ApiPropertyOptional({ example: '978-8375900934', description: 'ISBN number' })
  isbn?: string;

  @ApiPropertyOptional({ example: 'https://link.org/img.jpg', description: 'Link to cover image' })
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
}