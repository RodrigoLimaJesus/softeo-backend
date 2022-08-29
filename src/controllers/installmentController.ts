import { Request, Response } from 'express';
import IDateFilter from '../interfaces/dateFilter';
import InstallmentService from '../services/installmentService';

export default class InstallmentController {
  constructor(private _service = new InstallmentService()) {}

  getAll = async (req: Request, res: Response) => {
    const { startDate, endDate } = req.query as IDateFilter;

    const allInstallments = await this._service.getAll({ startDate, endDate });

    return res.status(200).json(allInstallments);
  };
}
