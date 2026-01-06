import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'aspen', description: 'Username' })
  username: string;

  @ApiProperty({ example: 'passwoerd123', description: 'Password' })
  password?: string; // TODO: make required in the future
}