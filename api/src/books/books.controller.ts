import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  
@Get(':userId')
@ApiOperation({ summary: 'view any user’s library with pagination (max 100 items per page)' })
@ApiQuery({ name: 'page', required: false, example: 1 })
@ApiQuery({ name: 'limit', required: false, example: 10, description: 'Max 100 items' })
@ApiResponse({ status: 200, description: 'List of books returned successfully' })
getAllBooks(
  @Param('userId', ParseIntPipe) userId: number,
  @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
  @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 10,
) {
  // dont allow negative or zero page numbers
  const validatedPage = page > 0 ? page : 1;

  //  books per page limit max 100, min 1
  const safeLimit = limit > 0 ? Math.min(limit, 100) : 1;

  return this.booksService.findAllByUserId(userId, validatedPage, safeLimit);
}

  @ApiBearerAuth('access-token') 
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Add a new book to your library' })
  @ApiResponse({ status: 201, description: 'Book created successfully' })
  create(@Request() req: any, @Body() createBookDto: CreateBookDto) {
    const myId = req.user.id; 
    return this.booksService.create(myId, createBookDto);
  }

  @ApiBearerAuth('access-token') 
  @UseGuards(JwtAuthGuard)
  @Patch()
  @ApiOperation({ summary: 'Update a book in your library' })
  @ApiResponse({ status: 201, description: 'Book updated successfully' })
  update(@Request() req: any, @Body() updateBookDto: UpdateBookDto) {
    const myId = req.user.id; 
    return this.booksService.update(myId, updateBookDto);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Remove a book from your library' })
  @ApiResponse({ status: 200, description: 'Book removed successfully' })
  @ApiResponse({ status: 404, description: 'Book not found' })
  remove(@Request() req: any, @Param('id') id: number) {
    const myId = req.user.id;
    return this.booksService.remove(myId, id);
  }
}
