import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
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

}
