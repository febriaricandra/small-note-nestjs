import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @ApiProperty({ description: 'Unique identifier for the user' })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @ApiProperty({ description: 'User email address' })
  email: string;

  @Column()
  @ApiProperty({ description: 'User password' })
  password: string;

  @CreateDateColumn()
  @ApiProperty({ description: 'Date when the user was created' })
  created_at: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: 'Date when the user was last updated' })
  updated_at: Date;
}
