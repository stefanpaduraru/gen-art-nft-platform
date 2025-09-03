import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { transformIntToNullBool } from '../utils/transformers';
import { Validate } from 'class-validator';
import { IdValidator } from '../validators/IdValidator';

export abstract class AbstractEntity {
  public static unsafelyConstructFromShape<T extends AbstractEntity>(
    shape: any,
  ) {
    return shape as T;
  }

  @Validate(IdValidator)
  @PrimaryGeneratedColumn()
  id?: number

  @Column({
    type: 'tinyint',
    width: 1,
    default: 0,
    transformer: transformIntToNullBool,
  })
  isDeleted?: boolean

  @CreateDateColumn()
  createdAt?: Date

  @UpdateDateColumn()
  updatedAt?: Date
}
