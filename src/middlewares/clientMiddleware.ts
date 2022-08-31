import { NextFunction, Request, Response } from 'express';
import IClient from '../interfaces/client';

export default class ClientMiddleware {
  constructor() {}

  validateName = (req: Request, _res: Response, next: NextFunction) => {
    const MIN_DIGITS = 3;

    const clientData: Partial<IClient> = req.body;

    if (!clientData.name) {
      throw new Error('nameNotProvided');
    } else if (clientData.name.length <= MIN_DIGITS) {
      throw new Error('nameInvalidLength');
    } else {
      next();
    }
  };

  validateCpf = (req: Request, _res: Response, next: NextFunction) => {
    const clientData: Partial<IClient> = req.body;
    const MIN_DIGITS = 11;

    const cpfParam = req.params.cpf;
    const clientCpf = clientData.cpf || cpfParam;

    if (!clientCpf) {
      throw new Error('cpfNotProvided');
    } else if (clientCpf.length !== MIN_DIGITS) {
      throw new Error('cpfInvalidLength');
    } else {
      next();
    }
  };

  validateEmail = (req: Request, _res: Response, next: NextFunction) => {
    const clientData: Partial<IClient> = req.body;
    const checkAtSign = clientData.email?.includes('@');
    const checkDot = clientData.email?.includes('.com');

    if (!clientData.email) {
      throw new Error('emailNotProvided');
    } else if (!checkAtSign || !checkDot) {
      throw new Error('emailInvalidFormat');
    } else {
      next();
    }
  };

  validateCellNumber = (req: Request, _res: Response, next: NextFunction) => {
    const MIN_DIGITS = 11;

    const clientData: Partial<IClient> = req.body;

    if (!clientData.cellNumber) {
      throw new Error('cellNumberNotProvided');
    } else if (clientData.cellNumber.length !== MIN_DIGITS) {
      throw new Error('cellNumberInvalidLength');
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
