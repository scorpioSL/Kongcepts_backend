import { ConflictException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { IError } from '../interfaces/error.interface';

export function catchError(res: Response, error: IError) {
  if (error.code) {
    if (error.code === 11000) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(new ConflictException(error));
    }
    return res.status(error.code).json(error);
  } else if (error.status) {
    return res.status(error.status).json(error);
  } else {
    return res.status(HttpStatus.NOT_ACCEPTABLE).json(error);
  }
}
