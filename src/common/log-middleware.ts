import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('Http');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl, body } = request;

    response.on('close', () => {
      const { statusCode } = response;

      this.logger.log(`${method} ${originalUrl} ${statusCode} ${ip}`);
      if (Object.keys(body).length)
        this.logger.debug('body: ', JSON.stringify({ ...body }));
    });

    next();
  }
}
