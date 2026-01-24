import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthService } from '../auth/auth.service';
import { UsersService } from './users.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
    
    constructor(private readonly usersService: UsersService, private readonly authService: AuthService) {}

    @Post('login')
    @ApiOperation({ summary: 'Log in' })
    async login(@Body() loginDto: LoginDto) {
        if (!loginDto.username || !loginDto.password) {
            throw new Error('Username and password are required');
        }
        const user = await this.usersService.validateUser(loginDto.username, loginDto.password);
        if (!user) {
            throw new Error('Invalid credentials');
        }
        return this.authService.login(user);
    }

    @Post('register')
    @ApiOperation({ summary: 'Register a new user' })
    async register(@Body() createUserDto: CreateUserDto) {
        const user = await this.usersService.create(createUserDto);
        return this.authService.login(user);
    }

    @Get(':username')
    @ApiOperation({ summary: 'Check if a user exists by username' })
    @ApiResponse({ status: 200, description: 'User exists' })
    @ApiResponse({ status: 404, description: 'User not found' })
    async checkUserExists(@Param('username') username: string) {
        const user = await this.usersService.findByUsername(username);
        if (!user) {
        throw new NotFoundException('User not found');
        }
        return { id: user.id, username: user.username };
    }

    @Get('id/:id')
    @ApiOperation({ summary: 'Find a user by their ID' })
    @ApiResponse({ status: 200, description: 'User found' })
    @ApiResponse({ status: 404, description: 'User not found' })
    async findById(@Param('id', ParseIntPipe) id: number) {
        const user = await this.usersService.findById(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return { id: user.id, username: user.username };
    }

}
