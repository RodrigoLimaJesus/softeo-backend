import { Request, Response } from 'express';
import { IBodyCreateInstallment } from '../interfaces/installment';
import { IDateFilter, IUpdateInfo } from '../interfaces/queryParams';
import InstallmentService from '../services/installmentService';

export default class InstallmentController {
  constructor(private _service = new InstallmentService()) {}

  getAll = async (req: Request, res: Response) => {
    const { startDate, endDate } = req.query as IDateFilter;

    const allInstallments = await this._service.getAll({ startDate, endDate });

    return res.status(200).json(allInstallments);
  };

  createMany = async (req: Request, res: Response) => {
    const infoToCreate = req.body as IBodyCreateInstallment;

    const allInstallments = await this._service.createMany(infoToCreate);

    return res.status(201).json(allInstallments);
  };

  updatePayment = async (req: Request, res: Response) => {
    const infoToUpdate = req.query as IUpdateInfo;

    const updatedInfo = await this._service.updatePayment(infoToUpdate);

    return res.status(200).json(updatedInfo);
  };

  exclude = async (req: Request, res: Response) => {
    const id = req.params.id as string;

    const clientData = await this._service.exclude(id);

    return res.status(200).json(clientData);
  };
}
