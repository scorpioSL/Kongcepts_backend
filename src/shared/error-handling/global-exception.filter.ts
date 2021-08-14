import {
  ArgumentsHost,
  ConflictException,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { MongoError } from 'mongodb';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost): unknown {
    console.log(exception);

    const response: Response = host.switchToHttp().getResponse();
    switch (exception.code) {
      case 11000: // duplicate exception
        return response
          .status(HttpStatus.CONFLICT)
          .json(new ConflictException());
      default:
        return response
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json(new BadRequestException(`error ${exception.code}`));
    }
  }
}
