/* eslint-disable @typescript-eslint/ban-types */
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  Logger,
} from '@nestjs/common';
import { ValidationError, validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import 'reflect-metadata';
import { ApiError } from './api-response';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    let message = '';
    if (errors[0]?.constraints) {
      for (const [, value] of Object.entries(errors[0].constraints)) {
        message += value;
      }
      throw new ApiError(message);
    }
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
