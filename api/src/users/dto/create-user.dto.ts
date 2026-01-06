import { IsString, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateUserDto {
  @ApiProperty({ example: 'aspen', description: 'Username' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'aspen@example.com', description: 'Email address' })
  @IsEmail()
  email: string;
  
  @ApiProperty({ example: 'passwoerd123', description: 'Password' })
  @IsString()
  @MinLength(6)
  password: string; // client sends password, not passwordHash
}
