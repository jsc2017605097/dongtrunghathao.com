import { HttpException, HttpStatus } from '@nestjs/common';

export class ApiOK {
  constructor(data?: any) {
    this.meta = {
      code: 0,
    };
    this.data = data;
  }
  meta: {
    code: number;
    msg?: string;
  };
  data: any;
}

export class ApiError extends HttpException {
  public meta: any;
  constructor(message: string, errorCode?: string, extraInfo?: any) {
    super(message, HttpStatus.BAD_REQUEST);
    this.meta = {
      msg: message || 'Internal server error',
      errorCode: errorCode || 'E-1',
      extraInfo: extraInfo || {},
      code: -1,
    };
  }

  static error(message: string, errorCode?: string, extraInfo?: any) {
    throw new ApiError(message, errorCode, extraInfo);
  }
}
