import { PrismaClient } from '@prisma/client';
import IDateFilter from '../../interfaces/dateFilter';

export default class InstallmentModel {
  private _model;

  constructor(private _prisma = new PrismaClient()) {
    this._prisma = _prisma;
    this._model = _prisma.installment;
  }

  getAll = async ({ startDate, endDate }: IDateFilter) => {
    await this._prisma.$connect();

    let start = undefined;
    let end = undefined;

    if (startDate) {
      start = new Date(startDate);
    }

    if (endDate) {
      end = new Date(endDate);
    }

    const allInstallments = await this._model.findMany({
      where: { paymentDate: { gte: start, lte: end } },
    });

    await this._prisma.$disconnect();

    return allInstallments;
  };
}
