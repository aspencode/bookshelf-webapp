import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './users/entities/user.entity';
import { Book } from './books/entities/book.entity';
import * as dotenv from 'dotenv';
dotenv.config();



export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Book],
  migrations: ['src/migrations/*.ts'],
  synchronize: false, // must be false when using migrations
});
