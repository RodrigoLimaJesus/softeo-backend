import { NextFunction, Request, Response } from 'express';
import { IBodyCreateInstallment } from '../interfaces/installment';

export default class InstallmentMiddleware {
  constructor() {}

  validateClientId = (req: Request, _res: Response, next: NextFunction) => {
    const { clientId }: Partial<IBodyCreateInstallment> = req.body;

    if (!clientId) {
      throw new Error('idNotProvided');
    } else if (typeof clientId !== 'number' || clientId % 1 !== 0) {
      throw new Error('idInvalidType');
    } else {
      next();
    }
  };

  validateStartDate = (req: Request, _res: Response, next: NextFunction) => {
    const { startDate }: Partial<IBodyCreateInstallment> = req.body;

    if (!startDate) {
      next();
    } else {
      const tryDate = new Date(startDate);
      const [year, month, day] = startDate.split('/');

      const validYear = Number(year) === tryDate.getFullYear();
      const validMonth = Number(month) === tryDate.getMonth() + 1;
      const validDay = Number(day) === tryDate.getDate();

      if (!validYear || !validMonth || !validDay) {
        throw new Error('invalidDateFormat');
      } else {
        next();
      }
    }
  };

  validatePrice = (req: Request, _res: Response, next: NextFunction) => {
    const { price }: Partial<IBodyCreateInstallment> = req.body;

    if (!price) {
      throw new Error('priceNotProvided');
    } else if (typeof price !== 'number') {
      throw new Error('priceInvalidType');
    } else {
      next();
    }
  };

  validateQuantity = (req: Request, _res: Response, next: NextFunction) => {
    const { quantity }: Partial<IBodyCreateInstallment> = req.body;

    if (!quantity) {
      throw new Error('quantityNotProvided');
    } else if (typeof quantity !== 'number' || quantity % 1 !== 0) {
      throw new Error('quantityInvalidType');
    } else {
      next();
    }
  };

  validateIntervalDay = (req: Request, _res: Response, next: NextFunction) => {
    const { intervalDay }: Partial<IBodyCreateInstallment> = req.body;

    if (!intervalDay) {
      throw new Error('intervalNotProvided');
    } else if (typeof intervalDay !== 'number' || intervalDay % 1 !== 0) {
      throw new Error('intervalInvalidType');
    } else {
      next();
    }
  };

  validateId = (req: Request, _res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!id) {
      throw new Error('idNotProvided');
    } else if (!Number(id) || Number(id) % 1 !== 0) {
      throw new Error('idInvalidType');
    } else {
      next();
    }
  };
}
